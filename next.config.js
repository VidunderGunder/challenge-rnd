const path = require("path");
const styledConfig = require(path.join(__dirname, "styled.config.js"));

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
  // reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: styledConfig,
  },
  // webpack: (config) => {
  //   return config;
  // },
  images: {
    domains: ["images.unsplash.com"],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
