/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://medha-cograd.azurewebsites.net/:path*",
      },
      {
        source: "/:path*",
        destination: "https://voicebot-server.onrender.com/:path*",
      },
      {
        source: "/api/:path",
        destination: "https://game.simplem.in/:path*"
      },
    ];
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
    serverActions: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default nextConfig;