import UnoCSS from "@unocss/webpack";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://example.com/api/:path*",
      },
    ];
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(UnoCSS());
    config.watchOptions = {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/,
    };
    return config;
  },
};

export default nextConfig;
