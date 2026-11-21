import Link from 'next/link';
import Logo from '@/components/Logo';
import { CookieSettingsLink } from '@/components/CookieConsent';
import { locales, siteConfig, type Locale } from '@/config/site';
import { ui, type UiStrings } from '@/lib/i18n/ui';
import { guideChrome, guidesFor } from '@/lib/guides';
import { analyzer } from '@/lib/analyzer/i18n';

const contact: Record<Locale, string> = {
  es: '¿Una pregunta? Escríbenos:',
  pt: 'Alguma dúvida? Escreva para:',
  it: 'Una domanda? Scrivici:',
  fr: 'Une question ? Écrivez-nous :',
  en: 'Questions? Email us:',
};

export default function SiteFooter({ locale, t }: { locale: Locale; t: UiStrings }) {
  return (
    <footer className="mt-16 border-t border-sand bg-surface text-ink">
      <div className="mx-auto max-w-6xl px-5 py-14 text-sm text-ink/70">
        <div className="mb-10 flex flex-col gap-4 border-b border-sand pb-10 sm:flex-row sm:items-end sm:justify-between">
          <Logo className="text-xl text-ink" />
          <p className="text-base">
            <span className="text-ink/70">{contact[locale]} </span>
            <a href={`mailto:${siteConfig.contact.email}`} className="font-semibold text-ink underline decoration-marker decoration-2 underline-offset-4">
              {siteConfig.contact.email}
            </a>
          </p>
        </div>
        <nav aria-label={guideChrome(locale).guidesTitle} className="mb-6">
          <p className="mb-3 font-semibold text-ink">{guideChrome(locale).guidesTitle}</p>
          <ul className="grid gap-x-5 gap-y-1 sm:grid-cols-2">
            <li>
              <Link href={`/${locale}/${analyzer(locale).slug}`} className="hover:text-ink">{analyzer(locale).label}</Link>
            </li>
            {guidesFor(locale).map((g) => (
              <li key={g.key}>
                <Link href={`/${locale}/${g.slug}`} className="hover:text-ink">{g.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="mb-4 flex flex-wrap gap-x-5 gap-y-2">
          <Link href={`/${locale}/legal`} className="hover:text-ink">{t.footer.legal}</Link>
          <Link href={`/${locale}/privacy`} className="hover:text-ink">{t.footer.privacy}</Link>
          <Link href={`/${locale}/terms`} className="hover:text-ink">{t.footer.terms}</Link>
          <Link href={`/${locale}/refund`} className="hover:text-ink">{t.footer.refund}</Link>
          <CookieSettingsLink locale={locale} className="hover:text-ink" />
        </nav>
        <nav aria-label={t.footer.languages} className="mb-4 flex flex-wrap gap-x-4 gap-y-2">
          {locales.map((l) => (
            <Link key={l} href={`/${l}`} hrefLang={l} className={l === locale ? 'font-semibold text-ink' : 'hover:text-ink'}>
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
