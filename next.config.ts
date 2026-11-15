import type { NextConfig } from "next";

/**
 * Static export: the site builds to plain HTML/CSS/JS in `out/`, so it can be
 * hosted on GitHub Pages (this repo) or Vercel without a server.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
