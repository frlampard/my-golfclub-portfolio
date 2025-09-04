/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbopack: true, // Turbopack 명시 (기본 활성화)
  },
};

module.exports = nextConfig;