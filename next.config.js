/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // ✅ Use standalone, NOT export
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
  experimental: {
    appDir: true,
  },
  api: {
    bodyParser: true,
    externalResolver: true,
  },
};

module.exports = nextConfig;
