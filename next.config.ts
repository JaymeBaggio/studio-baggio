import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      { source: "/fire-source", destination: "/work", permanent: true },
      { source: "/last30days", destination: "/work", permanent: true }
    ];
  }
};

export default nextConfig;
