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
          <svg width="76" height="76" viewBox="0 0 64 64"><rect x="2" y="2" width="60" height="60" rx="16" fill="#2554e8" /><path d="M44.5 22.5A14 14 0 1 0 44.5 39.5" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" /><path d="M19.5 40l-6 11 13-6.5z" fill="#fff" /><circle cx="47" cy="31" r="3.4" fill="#fff" /></svg>
          ConversaPDF
        </div>
        <div style={{ marginTop: 50, fontSize: 64, fontWeight: 700, lineHeight: 1.15 }}>{t.hero.title}</div>
        <div style={{ marginTop: 30, fontSize: 32, color: '#2554e8' }}>conversapdf.com</div>
      </div>
    ),
    size
  );
}
