import { NextRequest, NextResponse } from 'next/server';
import { polar, PRODUCT_IDS } from '@/lib/polar-server';
import type { Edition } from '@/lib/pdf/ChatDocument';

/** Creates a Polar checkout session for one edition. POST { edition, locale } -> { url } */
export async function POST(req: NextRequest) {
  const { edition, locale } = (await req.json().catch(() => ({}))) as { edition?: Edition; locale?: string };
  const productId = edition ? PRODUCT_IDS[edition] : '';
  if (!productId) return NextResponse.json({ error: 'unknown edition' }, { status: 400 });

  const origin = req.nextUrl.origin;
  const lang = typeof locale === 'string' && /^[a-z]{2}$/.test(locale) ? locale : 'en';
  try {
    const checkout = await polar<{ id: string; url: string }>('/v1/checkouts/', {
      method: 'POST',
      body: {
        products: [productId],
        success_url: `${origin}/${lang}?checkout_id={CHECKOUT_ID}`,
        embed_origin: origin,
        metadata: { edition: edition!, locale: lang },
      },
    });
    return NextResponse.json({ url: checkout.url, id: checkout.id });
  } catch (e) {
    console.error('[checkout]', e);
    return NextResponse.json({ error: 'checkout failed' }, { status: 502 });
  }
}
