import type { NextConfig } from 'next';

// Paid downloads are only offered when Paddle is fully configured (or in local
// development, where checkout is simulated).
const paymentsEnabled =
  process.env.NODE_ENV !== 'production' ||
  Boolean(
    process.env.PADDLE_API_KEY &&
      process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN &&
      process.env.NEXT_PUBLIC_PADDLE_PRICE_TEXT
  );

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: { NEXT_PUBLIC_PAYMENTS_ENABLED: paymentsEnabled ? '1' : '0' },
  eslint: { ignoreDuringBuilds: true },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.conversapdf.com' }],
        destination: 'https://conversapdf.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
