import Link from 'next/link';
import Logo from '@/components/Logo';
import { locales, siteConfig, type Locale } from '@/config/site';
import { ui, type UiStrings } from '@/lib/i18n/ui';
import { guideChrome, guidesFor } from '@/lib/guides';

export default function SiteFooter({ locale, t }: { locale: Locale; t: UiStrings }) {
  return (
    <footer className="mt-16 bg-leaf-dark text-white">
      <div className="mx-auto max-w-6xl px-5 py-14 text-sm text-white/70">
        <Logo inverse className="mb-10 text-xl text-white" />
        <nav aria-label={guideChrome(locale).guidesTitle} className="mb-6">
          <p className="mb-3 font-semibold text-white">{guideChrome(locale).guidesTitle}</p>
          <ul className="grid gap-x-5 gap-y-1 sm:grid-cols-2">
            {guidesFor(locale).map((g) => (
              <li key={g.key}>
                <Link href={`/${locale}/${g.slug}`} className="hover:text-white">{g.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="mb-4 flex flex-wrap gap-x-5 gap-y-2">
          <Link href={`/${locale}/legal`} className="hover:text-white">{t.footer.legal}</Link>
          <Link href={`/${locale}/privacy`} className="hover:text-white">{t.footer.privacy}</Link>
          <Link href={`/${locale}/terms`} className="hover:text-white">{t.footer.terms}</Link>
          <Link href={`/${locale}/refund`} className="hover:text-white">{t.footer.refund}</Link>
          <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white">{siteConfig.contact.email}</a>
        </nav>
        <nav aria-label={t.footer.languages} className="mb-4 flex flex-wrap gap-x-4 gap-y-2">
          {locales.map((l) => (
            <Link key={l} href={`/${l}`} hrefLang={l} className={l === locale ? 'font-semibold text-white' : 'hover:text-white'}>
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
