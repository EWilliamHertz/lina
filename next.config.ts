// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "3000-cs-553118797525-default.cs-europe-west4-pear.cloudshell.dev"
  ],
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb", // Increased limit for batch image uploads
    },
  },
};

export default nextConfig;