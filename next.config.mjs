/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Leaflet ships browser-only code; this keeps it out of the server bundle.
  serverExternalPackages: ['leaflet'],
  experimental: {
    optimizePackageImports: ['antd', '@ant-design/icons']
  }
};

export default nextConfig;
