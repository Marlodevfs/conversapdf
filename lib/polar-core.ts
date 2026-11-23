/**
 * Polar checkout logic, platform-agnostic (used by the Cloudflare Pages
 * Functions in /functions). Plain REST, no SDK. Environment:
 *   POLAR_ACCESS_TOKEN     organization access token (checkouts:write, checkouts:read)
 *   POLAR_PRODUCT_TEXT / POLAR_PRODUCT_PHOTOS / POLAR_PRODUCT_PROOF   product IDs
 *   POLAR_SERVER           optional: "sandbox" to use sandbox.polar.sh
 * Relative imports only: this file is bundled by Wrangler, not Next.js.
 */
import { siteConfig } from '../config/site';

type Edition = 'text' | 'photos' | 'proof';
export type PolarEnv = Partial<Record<'POLAR_ACCESS_TOKEN' | 'POLAR_PRODUCT_TEXT' | 'POLAR_PRODUCT_PHOTOS' | 'POLAR_PRODUCT_PROOF' | 'POLAR_SERVER', string>>;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

function productIds(env: PolarEnv): Record<Edition, string> {
  return { text: env.POLAR_PRODUCT_TEXT || '', photos: env.POLAR_PRODUCT_PHOTOS || '', proof: env.POLAR_PRODUCT_PROOF || '' };
}

async function polar<T = any>(env: PolarEnv, path: string, init?: { method?: string; body?: unknown }): Promise<T> {
  if (!env.POLAR_ACCESS_TOKEN) throw new Error('POLAR_ACCESS_TOKEN is not set');
  const base = env.POLAR_SERVER === 'sandbox' ? 'https://sandbox-api.polar.sh' : 'https://api.polar.sh';
  const res = await fetch(`${base}${path}`, {
    method: init?.method || 'GET',
    headers: { Authorization: `Bearer ${env.POLAR_ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
    body: init?.body ? JSON.stringify(init.body) : undefined,
  });
  if (!res.ok) throw new Error(`Polar API ${path} failed with ${res.status}: ${await res.text()}`);
  return (await res.json()) as T;
}

/** SHA-256 of the chat export, in hex: a purchase only unlocks that chat. */
const SHA = /^[a-f0-9]{64}$/;

/** POST { edition, locale, sha } -> { url, id } */
export async function handleCheckout(request: Request, env: PolarEnv): Promise<Response> {
  const { edition, locale, sha } = (await request.json().catch(() => ({}))) as { edition?: Edition; locale?: string; sha?: string };
  const productId = edition ? productIds(env)[edition] : '';
  if (!productId) return json({ error: 'unknown edition' }, 400);
  if (typeof sha !== 'string' || !SHA.test(sha)) return json({ error: 'missing chat fingerprint' }, 400);

  // The embedded checkout only renders inside the exact origin given here.
  const header = request.headers.get('origin') || '';
  const allowed = [siteConfig.url, 'https://www.conversapdf.com'];
  const origin = allowed.includes(header) || /^https:\/\/([a-z0-9-]+\.)?conversapdf\.pages\.dev$/.test(header) || header.startsWith('http://localhost') ? header : siteConfig.url;
  const lang = typeof locale === 'string' && /^[a-z]{2}$/.test(locale) ? locale : 'en';
  try {
    const checkout = await polar<{ id: string; url: string }>(env, '/v1/checkouts/', {
      method: 'POST',
      body: {
        products: [productId],
        success_url: `${origin}/${lang}?checkout_id={CHECKOUT_ID}`,
        embed_origin: origin,
        metadata: { edition: edition!, locale: lang, sha },
      },
    });
    return json({ url: checkout.url, id: checkout.id });
  } catch (e) {
    console.error('[checkout]', e);
    return json({ error: 'checkout failed' }, 502);
  }
}

/**
 * GET ?checkout_id=...&sha=... -> { ok, edition }. Polar marks a checkout
 * "confirmed" while the payment is processed, then "succeeded": wait a few
 * seconds for it. A purchase only unlocks the chat it was bought for: the
 * fingerprint stored in the checkout metadata must match.
 */
export async function handleVerify(request: Request, env: PolarEnv): Promise<Response> {
  const params = new URL(request.url).searchParams;
  const id = params.get('checkout_id') || '';
  const sha = params.get('sha') || '';
  if (!/^[A-Za-z0-9_-]{8,80}$/.test(id) || !SHA.test(sha)) return json({ ok: false }, 400);
  const ids = productIds(env);
  try {
    for (let attempt = 0; attempt < 8; attempt++) {
      const c = await polar<any>(env, `/v1/checkouts/${encodeURIComponent(id)}`);
      if (c?.status === 'succeeded') {
        if (c.metadata?.sha !== sha) return json({ ok: false, status: 'other_chat' }, 403);
        const pid = c.product_id || c.product?.id;
        const edition = (Object.keys(ids) as Edition[]).find((e) => ids[e] && ids[e] === pid);
        return edition ? json({ ok: true, edition }) : json({ ok: false }, 402);
      }
      if (c?.status !== 'confirmed') return json({ ok: false, status: c?.status }, 402);
      await new Promise((r) => setTimeout(r, 1500));
    }
    return json({ ok: false, status: 'pending' }, 202);
  } catch (e) {
    console.error('[verify]', e);
    return json({ ok: false }, 502);
  }
}

/** "/" -> browser language (es, pt, it, fr), English otherwise. */
export function handleRoot(request: Request): Response {
  const url = new URL(request.url);
  const header = request.headers.get('accept-language') || '';
  const supported = ['es', 'pt', 'it', 'fr', 'en'];
  const lang =
    header
      .split(',')
      .map((p) => {
        const [tag, q] = p.trim().split(';q=');
        return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
      })
      .sort((a, b) => b.q - a.q)
      .find((t) => supported.includes(t.lang))?.lang || 'en';
  return Response.redirect(`${url.origin}/${lang}${url.search}`, 302);
}
