/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/voiceflow",
        destination: "http://localhost:3001/voiceflow",
      },
    ];
  },
  experimental: {
    // serverActions: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
};

export default nextConfig;
