import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lbgiipvvwbwpadtfghtq.supabase.co",
      },
      {
        protocol: "https",
        hostname: "storage.ko-fi.com",
      },
    ],
  },
};

export default nextConfig;
