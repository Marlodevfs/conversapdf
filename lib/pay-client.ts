'use client';

/**
 * Polar embedded checkout (an overlay on top of the page, so the chat the
 * user loaded stays in memory while they pay).
 */
import type { Edition } from '@/lib/pdf/ChatDocument';

export const PAYMENTS_ENABLED = process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === '1';

/**
 * Opens the checkout and resolves with the checkout id once paid,
 * or null if the buyer closes it. In local development without Polar
 * keys, the purchase is simulated.
 */
export async function buyEdition(edition: Edition, locale: string, sha: string): Promise<string | null> {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ edition, locale, sha }),
  });
  if (!res.ok) {
    if (process.env.NODE_ENV !== 'production') return `demo_${edition}`;
    throw new Error('checkout failed');
  }
  const { url, id } = (await res.json()) as { url: string; id: string };
  const { PolarEmbedCheckout } = await import('@polar-sh/checkout/embed');
  const checkout = await PolarEmbedCheckout.create(url, { theme: 'light' });
  return new Promise((resolve) => {
    let paid = false;
    checkout.addEventListener('success', (event) => {
      event.preventDefault(); // stay on the page instead of following the success URL
      paid = true;
      checkout.close();
      resolve(id);
    });
    checkout.addEventListener('close', () => {
      if (!paid) resolve(null);
    });
  });
}

/** Confirms the purchase with the server, for this chat only (its SHA-256). */
export async function verifyPurchase(checkoutId: string, sha: string): Promise<Edition | null> {
  if (process.env.NODE_ENV !== 'production' && checkoutId.startsWith('demo_')) {
    return (checkoutId.slice(5) || 'proof') as Edition;
  }
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(`/api/verify?checkout_id=${encodeURIComponent(checkoutId)}&sha=${encodeURIComponent(sha)}`);
    if (res.status === 202) continue; // still processing
    if (!res.ok) return null;
    const json = await res.json();
    return json?.ok ? (json.edition as Edition) : null;
  }
  return null;
}
