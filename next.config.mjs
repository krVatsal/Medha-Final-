/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://game.simplem.in/:path*",
      },
    ];
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
    serverActions: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
};

export default nextConfig;
