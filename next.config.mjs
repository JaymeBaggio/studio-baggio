/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/fire-source", destination: "/work", permanent: true },
      { source: "/last30days", destination: "/work", permanent: true }
    ];
  }
};

export default nextConfig;
