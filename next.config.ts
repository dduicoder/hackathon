import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    api: "modern-compiler", // or "modern"
  },
};

export default nextConfig;
