# Parisi Horsham LP v2 — report

## 1. What I found

v1 was a Next.js 16 App Router page at `/free-evaluation` (home redirects there). Tailwind v4, Kanit, light canvas, WellnessLiving lead-capture widget (`src/lib/booking.ts`, hardcoded business/skin/location IDs). No GHL webhook, no server route, no Turnstile. reCAPTCHA lived inside the WL widget; this repo did not verify tokens. Phone was hardcoded once in `src/lib/content.ts` as `267-266-3430`. No `dangerouslySetInnerHTML`. `.env*` already gitignored except `.env.example`. Lockfile present. No tracked secrets. Form POSTed from the browser to WellnessLiving.

## 2. What I changed

- Phase 2: colour tokens, Archivo + Archivo Narrow, radius 0, shadows removed (`src/app/globals.css`, `src/app/layout.tsx`)
- Phase 3: `src/lib/content.ts` as the copy/phone/credentials/FAQ source. Phone **215-262-2935**.
- Phase 4: sections rebuilt to the v2 structure; angled divider deleted; adult photos not used
- Phase 5: `src/components/LeadForm.tsx` two-step form, hero + form section
- Phase 6: `src/app/api/lead/route.ts` + `src/lib/schema.ts`
- Phase 7: CSP/headers in `next.config.ts`, `.env.example`
- Phase 8: Pixel `Lead` + sanitised attribution
- Phase 9: `Reveal.tsx`, legal routes, testimonials shell
- Also: `zod` added; `sharp` 0.35.3 (npm audit high)

## 3. What I implemented for security

- Method/content-type + 8KB body cap — cheap DoS / junk POST
- SHA-256 hashed IP sliding window, 5 / 10 min, module memory — casual repeat submits. Does **not** stop a distributed attacker across cold starts
- Honeypot `company` — bots get `{ ok: true }`, nothing forwarded
- Timing 3s–2h — scripted instant fills
- Zod `.strict()` — unknown keys and unbounded strings
- Turnstile siteverify, 5s timeout = reject — client token without the secret
- Server-only `GHL_WEBHOOK_URL` — webhook not in the client bundle
- Generic `{ ok: false, message: "Unable to submit" }` — no check leakage
- Logs: timestamp, ip hash, check name, optional upstream status. No PII
- CSP + nosniff, DENY frame, referrer, permissions, HSTS. `script-src 'unsafe-inline'` is a real CSP weaken for Next bootstrap + Pixel

## 4. What I could not verify

- Live Turnstile keys / GHL webhook / Meta Pixel
- Fonts + Pixel + Turnstile together on a production domain
- Lighthouse, keyboard-only pass, CLS in a real browser
- GHL Conversions API using `eventId`

## 5. Open items needing a human

| Tag | Item | File |
|---|---|---|
| [RESOLVE] | Phone decided: `215-262-2935` | `src/lib/content.ts` |
| [VERIFY] | `25+` years | `src/lib/content.ts` credentials.years |
| [VERIFY] | `650,000+` athletes | `src/lib/content.ts` credentials.athletes |
| [VERIFY] | “more than two decades” | `src/lib/content.ts` whyParisi.body |
| [ASSET] | Hero youth photo | `src/components/free-evaluation/HeroSection.tsx` |
| [ASSET] | Why Parisi youth photo | `src/components/free-evaluation/WhyParisiSection.tsx` |
| [CONTENT PENDING] | Privacy / Terms / SMS Terms | `src/app/privacy`, `terms`, `sms-terms` |
| env | GHL webhook, Turnstile, Pixel, salt | `.env.example` |
| data | Testimonials | `src/lib/testimonials.ts` (empty) |

## 6. Deviations

- Files live under `src/` (existing App Router layout), not the brief’s root `app/` / `lib/` paths
- First Load JS for `/free-evaluation` is ~157KB gzip / 552KB uncompressed. Shared Next 16 + React 19 runtime is ~114KB gzip; page JS is ~31KB gzip. Cannot hit 120KB without changing the framework
- Lighthouse not run in this environment
- GitHub-mirrored repo: Origin `ManagePullRequest` cannot open a PR (`mirrorStatus=inbound`). Branch is `cursor/cinematic-landing-v2-1aa7`
