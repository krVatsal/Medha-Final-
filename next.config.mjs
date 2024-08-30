/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: "/:path*",  // Match all paths starting with /api/
          destination: "http://localhost:3001/:path*",  // Proxy these to the backend
        },
      ];
    },
    experimental: {
      serverActions: true,
      serverComponentsExternalPackages: ["mongoose"],
    },
  };
  
  export default nextConfig;
  