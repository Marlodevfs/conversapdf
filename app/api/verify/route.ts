import { NextRequest, NextResponse } from 'next/server';
import { editionForProduct, polar } from '@/lib/polar-server';

/**
 * Confirms that a Polar checkout is paid and returns which edition it unlocks.
 * GET /api/verify?checkout_id=...
 * Polar marks a checkout "confirmed" while the payment is processed, then
 * "succeeded": wait a few seconds for it.
 */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('checkout_id') || '';
  if (process.env.NODE_ENV !== 'production' && id.startsWith('demo_')) {
    return NextResponse.json({ ok: true, edition: id.slice(5) || 'proof' });
  }
  if (!/^[A-Za-z0-9_-]{8,80}$/.test(id)) return NextResponse.json({ ok: false }, { status: 400 });

  try {
    for (let attempt = 0; attempt < 8; attempt++) {
      const c = await polar<any>(`/v1/checkouts/${encodeURIComponent(id)}`);
      if (c?.status === 'succeeded') {
        const edition = editionForProduct(c.product_id || c.product?.id);
        if (!edition) return NextResponse.json({ ok: false }, { status: 402 });
        return NextResponse.json({ ok: true, edition });
      }
      if (c?.status !== 'confirmed') return NextResponse.json({ ok: false, status: c?.status }, { status: 402 });
      await new Promise((r) => setTimeout(r, 1500));
    }
    return NextResponse.json({ ok: false, status: 'pending' }, { status: 202 });
  } catch (e) {
    console.error('[verify]', e);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
