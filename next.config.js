/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['gateway.pinata.cloud','magenta-obliged-rodent-373.mypinata.cloud']
  },
}

module.exports = nextConfig
