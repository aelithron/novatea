import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [new URL('https://avatars.githubusercontent.com/u/**?v=4')]
  },
  async redirects() {
    return [
      { source: '/rss.xml', destination: '/feed', permanent: true },
      { source: '/rss', destination: '/feed', permanent: true },
      { source: '/feed.xml', destination: '/feed', permanent: true },
      { source: '/atom', destination: '/feed?type=atom', permanent: true },
      { source: '/atom.xml', destination: '/feed?type=atom', permanent: true },
      { source: '/feed.atom', destination: '/feed?type=atom', permanent: true },
    ]
  }
};

export default nextConfig;
