/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Remove unoptimized: true - this was causing slow loading!
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: true,
    qualities: [60, 65, 70, 75, 80], // Allow all quality values
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Fix the lockfile warning - set the root directory
  turbopack: {},
  // Fix the cross-origin WebSocket error - allow your IP
  allowedDevOrigins: [
    '192.168.0.102',  // Your VM's IP address
    'localhost',
    '*.local',        // For .local domains
  ],
  // Add these for better performance
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;