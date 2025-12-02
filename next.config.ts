import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   experimental: {
    turbo: false, // disable turbopack
  },
};

export default nextConfig;
