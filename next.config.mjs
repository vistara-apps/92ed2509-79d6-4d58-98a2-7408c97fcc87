/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.coingecko.com'],
  },
  env: {
    NEXT_PUBLIC_ONCHAINKIT_API_KEY: process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY,
    NEXT_PUBLIC_BASE_RPC_URL: process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://developer-rpc.base.org',
    NEXT_PUBLIC_COINGECKO_API_KEY: process.env.NEXT_PUBLIC_COINGECKO_API_KEY,
  },
};

export default nextConfig;
