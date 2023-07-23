/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['picsum.photos', 'localhost', 'images.igdb.com'],
  },
  output: 'standalone',
}

module.exports = nextConfig
