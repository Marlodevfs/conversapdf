/**
 * Server-side Polar helpers (plain REST, no SDK).
 *   POLAR_ACCESS_TOKEN     organization access token (scopes: checkouts:write, checkouts:read, products:read)
 *   POLAR_PRODUCT_TEXT     product IDs of the three one-time products
 *   POLAR_PRODUCT_PHOTOS
 *   POLAR_PRODUCT_PROOF
 *   POLAR_SERVER           optional: "sandbox" to use sandbox.polar.sh
 */
import type { Edition } from '@/lib/pdf/ChatDocument';

const BASE = process.env.POLAR_SERVER === 'sandbox' ? 'https://sandbox-api.polar.sh' : 'https://api.polar.sh';

export const PRODUCT_IDS: Record<Edition, string> = {
  text: process.env.POLAR_PRODUCT_TEXT || '',
  photos: process.env.POLAR_PRODUCT_PHOTOS || '',
  proof: process.env.POLAR_PRODUCT_PROOF || '',
};

export function editionForProduct(productId: string | undefined | null): Edition | null {
  if (!productId) return null;
  const hit = (Object.keys(PRODUCT_IDS) as Edition[]).find((e) => PRODUCT_IDS[e] === productId);
  return hit ?? null;
}

export async function polar<T = any>(path: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const token = process.env.POLAR_ACCESS_TOKEN;
  if (!token) throw new Error('POLAR_ACCESS_TOKEN is not set');
  const res = await fetch(`${BASE}${path}`, {
    method: init?.method || 'GET',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: init?.body ? JSON.stringify(init.body) : undefined,
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Polar API ${path} failed with ${res.status}: ${await res.text()}`);
  return (await res.json()) as T;
}
