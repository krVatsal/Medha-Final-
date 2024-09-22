/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://medha-cograd.azurewebsites.net/:path*",
      },
      {
        source: "/voicebot/:path*",
        destination: "https://voicebot-server.onrender.com/:path*",
      },
      {
        source: "/api/:path*",
        destination: "https://game.simplem.in/:path*",
      },
    ];
  },
  target: 'serverless',
  async headers() {
    return [
      {
        source: "/(.*)", // Matches all routes
        headers: [
          {
              key: 'Access-Control-Allow-Credentials',
              value: 'true',
          },
          {
              key: 'Access-Control-Allow-Origin',
              // Replace with your domain
              value: '*',
          },
          {
              key: 'Access-Control-Allow-Methods',
              value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
              key: 'Access-Control-Allow-Headers',
              value:
                  
'X-CSRF-Token, X-Requested-With, Accept, Accept- Version, Content - Length, Content - MD5, Content - Type, Date, X - Api - Version',
          },
      ],
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
      sizeLimit: "1mb",
    },
  },
};

export default nextConfig;
