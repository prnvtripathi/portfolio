import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/u/**",
      },
    ],
  },
  compiler: {
    removeConsole:
      process.env.ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
};

export default nextConfig;
