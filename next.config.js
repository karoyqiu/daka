const withPWA = require('next-pwa')({
  dest: 'public',
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
});

module.exports = nextConfig;
