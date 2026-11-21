import '../globals.css';
import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { isLocale, locales, siteConfig } from '@/config/site';
import { ui } from '@/lib/i18n/ui';
import Logo from '@/components/Logo';
import SiteFooter from '@/components/SiteFooter';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: '#1d6b4f', width: 'device-width', initialScale: 1 };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { metadataBase: new URL(siteConfig.url), applicationName: siteConfig.name };
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
        <header className="sticky top-0 z-20 border-b border-sand bg-paper/90 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
            <Link href={`/${locale}`} aria-label="ConversaPDF">
              <Logo className="text-lg" />
            </Link>
            <nav className="hidden gap-6 text-sm sm:flex">
              <a href={`/${locale}#how`} className="hover:text-leaf">{t.nav.how}</a>
              <a href={`/${locale}#pricing`} className="hover:text-leaf">{t.nav.pricing}</a>
              <a href={`/${locale}#faq`} className="hover:text-leaf">{t.nav.faq}</a>
            </nav>
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
