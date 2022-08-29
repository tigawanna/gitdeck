/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['assets.example.com', 'avatars.githubusercontent.com'],
  },
}

module.exports = nextConfig
