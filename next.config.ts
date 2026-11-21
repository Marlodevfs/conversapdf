import type { NextConfig } from 'next';

// Static export served by Cloudflare Pages; the API lives in /functions.
// Paid downloads are only offered when Polar is configured (or in local
// development, where checkout is simulated).
const paymentsEnabled =
  process.env.NODE_ENV !== 'production' ||
  Boolean(process.env.POLAR_ACCESS_TOKEN && process.env.POLAR_PRODUCT_TEXT);

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  env: { NEXT_PUBLIC_PAYMENTS_ENABLED: paymentsEnabled ? '1' : '0' },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
