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
      {
        source: "/api/submit-exam-form/",
        destination: "https://game.simplem.in/:path*",
      },
      {
        source: "/api/v1/:path*",
        destination: "http://localhost:5217/:path*",
      },
      {
        source: "/:path*",
        destination: "https://medha.cograd.in/socket.io/:path*",
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/socket.io/:path*", // Specific path for socket.io
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:3000", // Specify your exact origin
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token,X-Requested-With,Accept,Accept-Version,Content-Length,Content-MD5,Content-Type,Date,X-Api-Version",
          },
        ],
      },
    ];
  },

  experimental: {
    missingSuspenseWithCSRBailout: false,
    serverActions: {
      allowedOrigins: ['http://localhost:3000'],
    },
    serverComponentsExternalPackages: ["mongoose"],
  },

  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
  transpilePackages: ["three"],
};

export default nextConfig;