import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-0d53bd6936414629bfdea9341c2d193d.r2.dev', 
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
