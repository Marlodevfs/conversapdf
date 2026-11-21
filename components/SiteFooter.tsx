import Link from 'next/link';
import { locales, siteConfig, type Locale } from '@/config/site';
import { ui, type UiStrings } from '@/lib/i18n/ui';
import { guideChrome, guidesFor } from '@/lib/guides';

export default function SiteFooter({ locale, t }: { locale: Locale; t: UiStrings }) {
  return (
    <footer className="mt-20 border-t border-sand bg-white/60">
      <div className="mx-auto max-w-5xl px-5 py-10 text-sm text-ink/70">
        <nav aria-label={guideChrome(locale).guidesTitle} className="mb-6">
          <p className="mb-2 font-semibold text-ink">{guideChrome(locale).guidesTitle}</p>
          <ul className="grid gap-x-5 gap-y-1 sm:grid-cols-2">
            {guidesFor(locale).map((g) => (
              <li key={g.key}>
                <Link href={`/${locale}/${g.slug}`} className="hover:text-leaf">{g.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="mb-4 flex flex-wrap gap-x-5 gap-y-2">
          <Link href={`/${locale}/legal`} className="hover:text-leaf">{t.footer.legal}</Link>
          <Link href={`/${locale}/privacy`} className="hover:text-leaf">{t.footer.privacy}</Link>
          <Link href={`/${locale}/terms`} className="hover:text-leaf">{t.footer.terms}</Link>
          <Link href={`/${locale}/refund`} className="hover:text-leaf">{t.footer.refund}</Link>
          <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-leaf">{siteConfig.contact.email}</a>
        </nav>
        <nav aria-label={t.footer.languages} className="mb-4 flex flex-wrap gap-x-4 gap-y-2">
          {locales.map((l) => (
            <Link key={l} href={`/${l}`} hrefLang={l} className={l === locale ? 'font-semibold text-ink' : 'hover:text-leaf'}>
              {ui(l).langName}
            </Link>
          ))}
        </nav>
        <p>{t.footer.notAffiliated}</p>
        <p className="mt-1">{t.footer.twemoji}</p>
        <p className="mt-1">© {new Date().getFullYear()} ConversaPDF</p>
      </div>
    </footer>
  );
}
