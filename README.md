# Parisi Speed School Horsham — Free Evaluation Landing

## Setup
- `npm install`
- Copy `.env.example` → `.env.local` and set values
- `npm run dev` → http://localhost:3000/free-evaluation

## Required env
Server only:
- `GHL_WEBHOOK_URL` — GoHighLevel inbound webhook
- `TURNSTILE_SECRET_KEY` — Cloudflare Turnstile secret
- `RATE_LIMIT_SALT` — salt for hashing IPs in the rate limiter

Public:
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — Turnstile site key (invisible)
- `NEXT_PUBLIC_META_PIXEL_ID` — Meta Pixel ID (PageView + Lead)
- `NEXT_PUBLIC_SITE_URL` — canonical site URL

## Scripts
- `npm run dev` — development
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

## Notes
- Home `/` redirects to `/free-evaluation`
- Legal routes: `/privacy`, `/terms`, `/sms-terms` (content pending)
- Form posts to `/api/lead`. The GHL webhook is never exposed to the browser.
