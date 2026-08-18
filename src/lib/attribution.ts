export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;

export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];

export type AttributionParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  landingPath?: string;
  referrer?: string;
};

const STORAGE_KEY = "parisi_attribution";

export const clean = (v: string | null | undefined) =>
  (v ?? "").replace(/[^A-Za-z0-9_\-.]/g, "").slice(0, 100);

export function captureAttributionFromSearch(
  search: string | URLSearchParams,
): AttributionParams {
  const params =
    typeof search === "string" ? new URLSearchParams(search) : search;
  const captured: AttributionParams = {};

  for (const key of ATTRIBUTION_KEYS) {
    const value = clean(params.get(key));
    if (value) captured[key] = value;
  }

  if (typeof document !== "undefined") {
    const referrer = clean(document.referrer);
    if (referrer) captured.referrer = referrer;
  }

  if (typeof window !== "undefined") {
    const landingPath = clean(window.location.pathname);
    if (landingPath) captured.landingPath = landingPath;
  }

  const merged = { ...getStoredAttribution(), ...captured };
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    /* ignore quota / private mode */
  }
  return merged;
}

export function getStoredAttribution(): AttributionParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const out: AttributionParams = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === "string") {
        const cleaned = clean(value);
        if (cleaned) (out as Record<string, string>)[key] = cleaned;
      }
    }
    return out;
  } catch {
    return {};
  }
}

export function attributionForPayload(attr: AttributionParams) {
  return {
    utmSource: attr.utm_source ?? "",
    utmMedium: attr.utm_medium ?? "",
    utmCampaign: attr.utm_campaign ?? "",
    utmContent: attr.utm_content ?? "",
    utmTerm: attr.utm_term ?? "",
    fbclid: attr.fbclid ?? "",
    landingPath: attr.landingPath ?? "",
    referrer: attr.referrer ?? "",
  };
}
