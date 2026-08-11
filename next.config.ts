import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1440],
    imageSizes: [96, 128, 256, 384, 640],
  },
};

export default nextConfig;
