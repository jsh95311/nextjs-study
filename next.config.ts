import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@prisma/client', 'bcryptjs'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Prevent client bundle from trying to resolve server-only packages
      config.resolve.fallback = {
        ...config.resolve.fallback,
        bcryptjs: false,
        '@prisma/client': false,
        'pg': false,
        'fs': false,
        'net': false,
        'tls': false,
        'crypto': false,
      }
    }
    return config
  },
};

export default nextConfig;
