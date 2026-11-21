/**
 * Server-side Paddle Billing helpers (plain REST, no SDK).
 *   PADDLE_API_KEY       secret API key (sandbox keys contain "sdbx")
 *   PADDLE_ENVIRONMENT   optional: "sandbox" | "production" (guessed from the key otherwise)
 */
function isSandbox(): boolean {
  const env = process.env.PADDLE_ENVIRONMENT;
  if (env) return env === 'sandbox';
  return (process.env.PADDLE_API_KEY || '').includes('sdbx');
}

export async function paddleGet<T = any>(path: string): Promise<T> {
  const key = process.env.PADDLE_API_KEY;
  if (!key) throw new Error('PADDLE_API_KEY is not set');
  const base = isSandbox() ? 'https://sandbox-api.paddle.com' : 'https://api.paddle.com';
  const res = await fetch(`${base}${path}`, { headers: { Authorization: `Bearer ${key}` }, cache: 'no-store' });
  if (!res.ok) throw new Error(`Paddle API ${path} failed with ${res.status}`);
  return (await res.json()).data as T;
}
