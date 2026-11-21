import { ImageResponse } from 'next/og';
import { isLocale, locales } from '@/config/site';
import { ui } from '@/lib/i18n/ui';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'ConversaPDF';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = ui(isLocale(locale) ? locale : 'en');
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, background: '#09090b', color: '#f2ece2' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 44, fontWeight: 700 }}>
          <svg width="76" height="76" viewBox="0 0 64 64" fill="none"><path d="M15 8h27l14 14v19a8 8 0 0 1-8 8H27l-12 9 2-9h-2a8 8 0 0 1-8-8V16a8 8 0 0 1 8-8z" stroke="#f2ece2" stroke-width="3.2" stroke-linejoin="round" /><path d="M42 8v8a6 6 0 0 0 6 6h8z" fill="#f5e14a" /><path d="M18 26h20M18 34h13" stroke="#f2ece2" stroke-width="3.2" stroke-linecap="round" opacity="0.55" /></svg>
          ConversaPDF
        </div>
        <div style={{ marginTop: 50, fontSize: 64, fontWeight: 700, lineHeight: 1.15 }}>{t.hero.title}</div>
        <div style={{ marginTop: 30, fontSize: 32, color: '#f5e14a' }}>conversapdf.com</div>
      </div>
    ),
    size
  );
}
