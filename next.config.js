const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
});

module.exports = nextConfig;
