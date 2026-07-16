import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'ix-marketing.imgix.net',
        protocol: 'https',
        port: "",
      }
    ]
  }
};

export default nextConfig;
