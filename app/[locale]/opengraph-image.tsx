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
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, background: '#f7f3ea', color: '#1f2a24' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 44, fontWeight: 700 }}>
          <div style={{ width: 72, height: 72, borderRadius: 18, background: '#1f8a5b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>PDF</div>
          ConversaPDF
        </div>
        <div style={{ marginTop: 50, fontSize: 64, fontWeight: 700, lineHeight: 1.15 }}>{t.hero.title}</div>
        <div style={{ marginTop: 30, fontSize: 32, color: '#1f8a5b' }}>conversapdf.com</div>
      </div>
    ),
    size
  );
}
