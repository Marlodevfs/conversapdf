import '../globals.css';
import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { isLocale, locales, siteConfig } from '@/config/site';
import { ui } from '@/lib/i18n/ui';
import Logo from '@/components/Logo';
import SiteFooter from '@/components/SiteFooter';
import LanguageMenu from '@/components/LanguageMenu';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: '#155741', width: 'device-width', initialScale: 1 };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = ui(locale);
  return (
    <html lang={locale}>
      <body>
        <header className="sticky top-0 z-20 border-b border-sand/80 bg-paper/85 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
            <Link href={`/${locale}`} aria-label="ConversaPDF">
              <Logo className="text-xl" />
            </Link>
            <div className="flex items-center gap-7">
              <nav className="hidden gap-7 text-[15px] font-medium text-ink/75 md:flex">
                <a href={`/${locale}#how`} className="hover:text-ink">{t.nav.how}</a>
                <a href={`/${locale}#pricing`} className="hover:text-ink">{t.nav.pricing}</a>
                <a href={`/${locale}#faq`} className="hover:text-ink">{t.nav.faq}</a>
              </nav>
              <LanguageMenu current={locale} label={t.footer.languages} langs={locales.map((l) => ({ code: l, name: ui(l).langName }))} />
            </div>
          </div>
        </header>
        <main>{children}</main>
        <SiteFooter locale={locale} t={t} />
        {siteConfig.goatcounter && (
          <Script
            data-goatcounter={`https://${siteConfig.goatcounter}.goatcounter.com/count`}
            src="https://gc.zgo.at/count.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
