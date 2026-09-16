/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // All artwork is served from /public, so the built-in optimiser (sharp)
    // can generate responsive sources without remote patterns.
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [39, 46, 70, 96, 128, 256, 384]
  },
  async redirects() {
    // Friendly aliases only — every existing Farm to Table screen keeps the
    // exact URL it had before the migration.
    return [
      { source: '/shop', destination: '/products', permanent: true },
      { source: '/producers', destination: '/farms', permanent: true },
      { source: '/categories', destination: '/products', permanent: true },
      { source: '/categories/:category', destination: '/products?category=:category', permanent: true },
      { source: '/producers/:farmId', destination: '/farm/:farmId', permanent: true }
    ];
  }
};

export default nextConfig;
