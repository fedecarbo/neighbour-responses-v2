import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@shared/types"],
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
