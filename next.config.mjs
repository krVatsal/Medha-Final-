/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the rewrites section as it's no longer needed
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
};

export default nextConfig;
