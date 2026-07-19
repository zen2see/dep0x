import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true, // 👈 Enable this line
    contentDispositionType: 'attachment', // Recommended security  when enabling SVGs
    remotePatterns: [
      {
        hostname: 'ix-marketing.imgix.net',
        protocol: 'https',
        port: "",
      },
     {
        protocol: 'https',
        hostname: 'amicable-donkey-507.convex.cloud',
     }
   ]
  }
};

export default nextConfig;
