import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://avatars.githubusercontent.com/u/**?v=4')]
  }
};

export default nextConfig;
