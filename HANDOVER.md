## HANDOVER — Parisi Free Evaluation Landing

### What changed
- Replaced displayed phone `267-266-3430` with `+1 215-706-8260` everywhere (header, footer, thank-you, booking fallback)
- Added on-site `/privacy`, `/terms`, and `/sms-terms` using the HAC A2P legal pack with Parisi Horsham identity, `info@parisihorsham.com`, and the new phone
- Footer now links internally to Privacy, Terms of Service, and SMS Terms & Conditions (live `/privacy` and `/terms` were 404s)

### Files touched
- `src/lib/content.ts` — phone, email, internal legal URLs
- `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/app/sms-terms/page.tsx`
- `src/components/legal/LegalChrome.tsx`
- `src/components/free-evaluation/{LandingHeader,LandingFooter}.tsx`
- `src/app/globals.css`
- `README.md`, `CHANGELOG.md`, `HANDOVER.md`

### Pending / needs from owner
- Attached Privacy/Terms/SMS files were not in the agent payload; confirm the published copy (especially legal entity / DBA) against the documents you meant to attach
- Set `NEXT_PUBLIC_META_PIXEL_ID` in production (HAC site uses `290507659146418` — confirm correct campaign pixel)
- Optionally configure WellnessLiving success redirect → `/thank-you`
- Replace hero/coaching imagery later if stronger Horsham assets become available
- CAPI not implemented (no server token present) — Pixel-only Schedule with eventID ready for future CAPI dedupe

### Notes
- Home `/` redirects to `/free-evaluation`
- No fake testimonials
