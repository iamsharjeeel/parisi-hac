## HANDOVER — Parisi Free Evaluation Landing

### What changed
- Redesigned booking form UI: dark Parisi card, themed WL fields, scaled captcha treatment, shadow-DOM theme injection
- Fixed Vercel build: removed broken `Source_Sans_3` next/font fetch (gstatic 404s); Kanit only
- Built production Meta Ads landing page at `/free-evaluation`
- Reused verified WellnessLiving lead-capture widget from live Horsham evaluation page
- Added Meta Pixel PageView + `Schedule` conversion tracking (confirmation-only)
- Captures UTMs + `fbclid` in sessionStorage

### Files touched
- `src/app/free-evaluation/page.tsx` — landing route
- `src/app/thank-you/page.tsx` — confirmation / Schedule fire backup
- `src/components/free-evaluation/*` — page sections
- `src/lib/{content,analytics,attribution,booking}.ts`
- `src/components/analytics/*`
- `public/images/*` — logo + optimized local training photography
- `.env.example`, `README.md`, `CHANGELOG.md`

### Pending / needs from owner
- Set `NEXT_PUBLIC_META_PIXEL_ID` in production (HAC site uses `290507659146418` — confirm correct campaign pixel)
- Optionally configure WellnessLiving success redirect → `/thank-you`
- Replace hero/coaching imagery later if stronger Horsham assets become available
- CAPI not implemented (no server token present) — Pixel-only Schedule with eventID ready for future CAPI dedupe

### Notes
- Home `/` redirects to `/free-evaluation`
- Privacy/Terms link to existing live site URLs (not fabricated)
- No fake testimonials
