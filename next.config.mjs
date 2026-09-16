/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/shop', destination: '/products', permanent: true },
      { source: '/categories', destination: '/products', permanent: true },
      { source: '/producers', destination: '/farms', permanent: true },
      { source: '/producers/:slug', destination: '/farm/:slug', permanent: true },
    ];
  },
};
export default nextConfig;
