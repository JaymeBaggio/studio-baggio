import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/fire-source", destination: "/work", permanent: true }
    ];
  }
};

export default nextConfig;
