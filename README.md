# Parisi Speed School Horsham — Free Evaluation Landing

## Setup
- `npm install`
- Copy `.env.example` → `.env.local` and set values
- `npm run dev` → http://localhost:3000/free-evaluation

## Required env
- `NEXT_PUBLIC_META_PIXEL_ID` — Meta Pixel ID (PageView + Schedule)
- WellnessLiving widget IDs already set from the live Horsham evaluation page (override via env if needed)

## Routes
- `/` — redirects to `/free-evaluation`
- `/free-evaluation` — Meta Ads landing + booking
- `/thank-you` — confirmation / Schedule fire backup
- `/privacy` — Privacy Policy
- `/terms` — Terms of Service
- `/sms-terms` — SMS Terms & Conditions

## Scripts
- `npm run dev` — development
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint
