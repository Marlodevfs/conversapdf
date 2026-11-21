'use client';

/**
 * Paddle.js overlay checkout for one-time purchases (one PDF per conversation).
 * Public env vars: NEXT_PUBLIC_PADDLE_CLIENT_TOKEN, NEXT_PUBLIC_PADDLE_PRICE_TEXT,
 * NEXT_PUBLIC_PADDLE_PRICE_PHOTOS, NEXT_PUBLIC_PADDLE_PRICE_PROOF.
 */
import type { Edition } from '@/lib/pdf/ChatDocument';

const CLIENT_TOKEN = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || '';
const PRICE_IDS: Record<Edition, string> = {
  text: process.env.NEXT_PUBLIC_PADDLE_PRICE_TEXT || '',
  photos: process.env.NEXT_PUBLIC_PADDLE_PRICE_PHOTOS || '',
  proof: process.env.NEXT_PUBLIC_PADDLE_PRICE_PROOF || '',
};

export const PAYMENTS_ENABLED = process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === '1';

declare global {
  interface Window {
    Paddle?: any;
  }
}

let loader: Promise<any> | null = null;
let onCompleted: ((txn: string) => void) | null = null;
let onClosed: (() => void) | null = null;

function loadPaddle(locale: string): Promise<any> {
  if (loader) return loader;
  loader = new Promise((resolve, reject) => {
    const init = () => {
      const Paddle = window.Paddle;
      if (!Paddle) return reject(new Error('Paddle.js failed to load'));
      if (CLIENT_TOKEN.startsWith('test_')) Paddle.Environment.set('sandbox');
      Paddle.Initialize({
        token: CLIENT_TOKEN,
        checkout: { settings: { displayMode: 'overlay', theme: 'light', locale } },
        eventCallback: (event: any) => {
          if (event?.name === 'checkout.completed' && event.data?.transaction_id) {
            onCompleted?.(event.data.transaction_id);
          }
          if (event?.name === 'checkout.closed') onClosed?.();
        },
      });
      resolve(Paddle);
    };
    if (window.Paddle) return init();
    const script = document.createElement('script');
    script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
    script.async = true;
    script.onload = init;
    script.onerror = () => {
      loader = null;
      reject(new Error('Paddle.js failed to load'));
    };
    document.head.appendChild(script);
  });
  return loader;
}

/**
 * Opens the checkout and resolves with the transaction id once paid,
 * or null if the buyer closes the overlay. In local development without
 * Paddle keys, the purchase is simulated.
 */
export async function buyEdition(edition: Edition, locale: string): Promise<string | null> {
  const priceId = PRICE_IDS[edition];
  if (!CLIENT_TOKEN || !priceId) {
    if (process.env.NODE_ENV !== 'production') return `demo_${edition}`;
    throw new Error('Paddle is not configured');
  }
  const Paddle = await loadPaddle(locale);
  return new Promise((resolve) => {
    let settled = false;
    onCompleted = (txn) => {
      settled = true;
      window.Paddle?.Checkout?.close?.();
      resolve(txn);
    };
    onClosed = () => {
      if (!settled) resolve(null);
    };
    Paddle.Checkout.open({ items: [{ priceId, quantity: 1 }] });
  });
}

export async function verifyPurchase(txn: string): Promise<Edition | null> {
  const res = await fetch(`/api/verify?txn=${encodeURIComponent(txn)}`);
  if (!res.ok) return null;
  const json = await res.json();
  return json?.ok ? (json.edition as Edition) : null;
}
