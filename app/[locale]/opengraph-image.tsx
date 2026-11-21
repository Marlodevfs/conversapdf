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
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, background: '#f5f8ff', color: '#0f172a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 44, fontWeight: 700 }}>
          <svg width="76" height="76" viewBox="0 0 64 64"><path d="M14 6H44L58 20V42a8 8 0 0 1-8 8H26L12 59l2-9a8 8 0 0 1-8-8V14a8 8 0 0 1 8-8z" fill="#2554e8" /><path d="M44 6v10a4 4 0 0 0 4 4h10z" fill="#f5e14a" /><rect x="14" y="23" width="26" height="4.5" rx="2.25" fill="#fff" /><rect x="14" y="32" width="17" height="4.5" rx="2.25" fill="#fff" opacity="0.75" /></svg>
          ConversaPDF
        </div>
        <div style={{ marginTop: 50, fontSize: 64, fontWeight: 700, lineHeight: 1.15 }}>{t.hero.title}</div>
        <div style={{ marginTop: 30, fontSize: 32, color: '#2554e8' }}>conversapdf.com</div>
      </div>
    ),
    size
  );
}
