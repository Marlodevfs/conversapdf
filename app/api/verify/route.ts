import { NextRequest, NextResponse } from 'next/server';
import { paddleGet } from '@/lib/paddle-server';

/**
 * Confirms that a Paddle transaction is paid and returns which edition it unlocks.
 * GET /api/verify?txn=txn_...
 */
const PRICE_TO_EDITION: Record<string, 'text' | 'photos' | 'proof'> = Object.fromEntries(
  (
    [
      [process.env.NEXT_PUBLIC_PADDLE_PRICE_TEXT, 'text'],
      [process.env.NEXT_PUBLIC_PADDLE_PRICE_PHOTOS, 'photos'],
      [process.env.NEXT_PUBLIC_PADDLE_PRICE_PROOF, 'proof'],
    ] as const
  ).filter(([id]) => Boolean(id)) as [string, 'text' | 'photos' | 'proof'][]
);

export async function GET(req: NextRequest) {
  const txn = req.nextUrl.searchParams.get('txn') || '';
  if (process.env.NODE_ENV !== 'production' && txn.startsWith('demo_')) {
    return NextResponse.json({ ok: true, edition: txn.slice(5) || 'proof' });
  }
  if (!/^txn_[a-z0-9]+$/i.test(txn)) return NextResponse.json({ ok: false }, { status: 400 });

  try {
    const t = await paddleGet<any>(`/transactions/${encodeURIComponent(txn)}`);
    const paid = t?.status === 'paid' || t?.status === 'completed';
    const priceId: string | undefined = t?.items?.[0]?.price?.id || t?.items?.[0]?.price_id;
    const edition = priceId ? PRICE_TO_EDITION[priceId] : undefined;
    if (!paid || !edition) return NextResponse.json({ ok: false }, { status: 402 });
    return NextResponse.json({ ok: true, edition });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
