import type { NextConfig } from "next";

// 'unsafe-inline' in script-src is required by the Next.js App Router bootstrap
// and the inline Meta Pixel snippet. It is a real weakening of the CSP.
// Upgrade path: generate a per-request nonce in middleware.ts, pass it to the
// Pixel <Script> tag, and swap 'unsafe-inline' for 'nonce-{value}' 'strict-dynamic'.
// object-src 'none', base-uri 'self' and frame-ancestors 'none' are the controls
// carrying the load in the meantime.

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://connect.facebook.net https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.facebook.com",
  "font-src 'self'",
  "connect-src 'self' https://www.facebook.com https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1440],
    imageSizes: [96, 128, 256, 384, 640],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
