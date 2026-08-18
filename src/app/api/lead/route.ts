import { createHash } from "node:crypto";
import { leadSchema } from "@/lib/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 8 * 1024;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MIN_FILL_MS = 3000;
const MAX_FILL_MS = 2 * 60 * 60 * 1000;

// Best-effort rate limiting. This lives in the memory of a single serverless
// instance, so a distributed attacker hitting several cold starts can exceed
// the limit. It stops casual abuse and repeated submissions, which is the
// actual threat model for a lead form. For a hard guarantee, move this to
// Upstash Redis or Vercel KV.
type Bucket = { hits: number[] };
const buckets = new Map<string, Bucket>();

function jsonError() {
  return Response.json(
    { ok: false, message: "Unable to submit" },
    { status: 400 },
  );
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "0.0.0.0";
}

function hashIp(ip: string, salt: string): string {
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

function logOutcome(entry: {
  ipHash: string;
  check: string;
  upstream?: number;
}) {
  console.info(
    JSON.stringify({
      ts: new Date().toISOString(),
      ipHash: entry.ipHash,
      check: entry.check,
      ...(entry.upstream !== undefined ? { upstream: entry.upstream } : {}),
    }),
  );
}

function isRateLimited(ipHash: string): boolean {
  const now = Date.now();
  const current = buckets.get(ipHash)?.hits.filter((t) => now - t < WINDOW_MS) ?? [];
  if (current.length >= MAX_REQUESTS) {
    buckets.set(ipHash, { hits: current });
    return true;
  }
  current.push(now);
  buckets.set(ipHash, { hits: current });
  return false;
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret,
          response: token,
          remoteip: ip,
        }),
        signal: controller.signal,
      },
    );
    const data = (await response.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(request: Request) {
  const salt = process.env.RATE_LIMIT_SALT || "missing-salt";
  const ip = clientIp(request);
  const ipHash = hashIp(ip, salt);

  if (request.method !== "POST") {
    logOutcome({ ipHash, check: "method" });
    return jsonError();
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    logOutcome({ ipHash, check: "content-type" });
    return jsonError();
  }

  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
    logOutcome({ ipHash, check: "body-size" });
    return jsonError();
  }

  if (isRateLimited(ipHash)) {
    logOutcome({ ipHash, check: "rate-limit" });
    return jsonError();
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    logOutcome({ ipHash, check: "json" });
    return jsonError();
  }

  const honeypot = typeof body.company === "string" ? body.company : "";
  if (honeypot.length > 0) {
    logOutcome({ ipHash, check: "honeypot-discard" });
    return Response.json({ ok: true });
  }

  const renderedAt =
    typeof body.renderedAt === "number" ? body.renderedAt : Number.NaN;
  const elapsed = Date.now() - renderedAt;
  if (!Number.isFinite(renderedAt) || elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS) {
    logOutcome({ ipHash, check: "timing" });
    return jsonError();
  }

  const candidate = { ...body };
  delete candidate.company;
  delete candidate.renderedAt;
  const parsed = leadSchema.safeParse(candidate);
  if (!parsed.success) {
    logOutcome({ ipHash, check: "schema" });
    return jsonError();
  }

  const turnstileOk = await verifyTurnstile(parsed.data.turnstileToken, ip);
  if (!turnstileOk) {
    logOutcome({ ipHash, check: "turnstile" });
    return jsonError();
  }

  const webhook = process.env.GHL_WEBHOOK_URL;
  if (!webhook) {
    logOutcome({ ipHash, check: "ghl-missing" });
    return jsonError();
  }

  const payload = {
    firstName: parsed.data.firstName,
    lastName: parsed.data.lastName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    athleteFirstName: parsed.data.athleteFirstName,
    athleteAgeBand: parsed.data.athleteAgeBand,
    sport: parsed.data.sport,
    availability: parsed.data.availability,
    notes: parsed.data.notes,
    smsConsent: parsed.data.smsConsent,
    eventId: parsed.data.eventId,
    source: "landing-page",
    utmSource: parsed.data.utmSource,
    utmMedium: parsed.data.utmMedium,
    utmCampaign: parsed.data.utmCampaign,
    utmContent: parsed.data.utmContent,
    utmTerm: parsed.data.utmTerm,
    fbclid: parsed.data.fbclid,
    landingPath: parsed.data.landingPath,
    referrer: parsed.data.referrer,
  };

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const upstream = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!upstream.ok) {
      logOutcome({ ipHash, check: "ghl", upstream: upstream.status });
      return jsonError();
    }
  } catch {
    logOutcome({ ipHash, check: "ghl" });
    return jsonError();
  }

  logOutcome({ ipHash, check: "ok" });
  return Response.json({ ok: true });
}

export async function GET() {
  return jsonError();
}
