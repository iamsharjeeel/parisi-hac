## HANDOVER — Parisi Free Evaluation Landing v2

### What changed
- Rebuilt the landing page to cinematic-hero (true black, Archivo, 0 radius)
- Phone number set to `215-262-2935` in `src/lib/content.ts` (single constant)
- Replaced WellnessLiving embed with a two-step lead form posting to `/api/lead`
- Added Turnstile (invisible), honeypot, timing check, hashed IP rate limit, Zod validation
- Server forwards validated payloads to GHL; webhook stays server-side
- Added `/privacy`, `/terms`, `/sms-terms` placeholders
- Meta Pixel fires `Lead` with `eventId` after a 200 from `/api/lead`

### Files touched
- `src/app/globals.css`, `src/app/layout.tsx`, `next.config.ts`
- `src/lib/content.ts`, `src/lib/schema.ts`, `src/lib/testimonials.ts`, `src/lib/attribution.ts`, `src/lib/analytics.ts`
- `src/components/LeadForm.tsx`, `src/components/Reveal.tsx`, `src/components/Testimonials.tsx`
- `src/components/free-evaluation/*`
- `src/app/api/lead/route.ts`
- `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/app/sms-terms/page.tsx`
- `.env.example`, `README.md`, `CHANGELOG.md`

### Pending / needs from owner
- Youth-athlete photography for hero and Why Parisi (`[ASSET]`)
- Confirm `25+` years and `650,000+` athletes (`[VERIFY]`)
- GHL webhook URL, Turnstile keys, Meta Pixel ID, `RATE_LIMIT_SALT`
- Legal copy for privacy / terms / SMS terms (`[CONTENT PENDING]`)
- Permissioned testimonials (`src/lib/testimonials.ts` is empty by design)
- Confirm GHL Conversions API uses the same `eventId`

### Notes
- Do not ship the adult-athlete photos currently in `public/images/`
- Rate limiter is per serverless instance, not a distributed guarantee
