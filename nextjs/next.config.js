/** @type {import('next').NextConfig} */
const nextConfig = {
  unoptimized: true, // Disable image optimization
  images: {
    unoptimized: true, // Disable image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Add this for Docker
  output: 'standalone',
};

module.exports = nextConfig;
