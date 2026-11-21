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

export const viewport: Viewport = { themeColor: '#2554e8', width: 'device-width', initialScale: 1 };

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
                <header className="sticky top-0 z-40 border-b border-sand/80 bg-paper/85 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3.5 sm:px-5">
            <Link href={`/${locale}`} aria-label="ConversaPDF">
              <Logo className="text-lg sm:text-xl" />
            </Link>
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-7">
              <nav className="hidden gap-7 text-[15px] font-medium text-ink/75 lg:flex">
                <a href={`/${locale}#how`} className="hover:text-ink">{t.nav.how}</a>
                <a href={`/${locale}#pricing`} className="hover:text-ink">{t.nav.pricing}</a>
                <a href={`/${locale}#faq`} className="hover:text-ink">{t.nav.faq}</a>
              </nav>
              <a href={`/${locale}#tool`} className="whitespace-nowrap rounded-full bg-leaf px-3 py-2 text-sm font-semibold text-white hover:bg-leaf-dark sm:px-4 sm:text-[15px]">
                <span className="sm:hidden">{t.nav.convertShort}</span>
                <span className="hidden sm:inline">{t.nav.convert}</span>
              </a>
              <LanguageMenu current={locale} label={t.footer.languages} langs={locales.map((l) => ({ code: l, name: ui(l).langName }))} />
            </div>
          </div>
        </header>
        <main className="relative z-0 overflow-x-clip">{children}</main>
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
