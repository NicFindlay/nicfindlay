import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Keeps the framework's dev overlay badge off the page.
  devIndicators: false,
};

export default nextConfig;
