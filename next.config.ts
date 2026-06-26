import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/fire-source", destination: "/work", permanent: true },
      { source: "/work/last30days", destination: "/last30days", permanent: true }
    ];
  }
};

export default nextConfig;
