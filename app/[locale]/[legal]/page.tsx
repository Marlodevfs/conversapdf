import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, locales, siteConfig } from '@/config/site';
import { legalPage, legalSlugs, type LegalSlug } from '@/lib/i18n/legal';

type Props = { params: Promise<{ locale: string; legal: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => legalSlugs.map((legal) => ({ locale, legal })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, legal } = await params;
  if (!isLocale(locale) || !legalSlugs.includes(legal as LegalSlug)) return {};
  const page = legalPage(locale, legal as LegalSlug);
  return {
    title: `${page.title} | ConversaPDF`,
    alternates: { canonical: `${siteConfig.url}/${locale}/${legal}` },
  };
}

export default async function Legal({ params }: Props) {
  const { locale, legal } = await params;
  if (!isLocale(locale) || !legalSlugs.includes(legal as LegalSlug)) notFound();
  const page = legalPage(locale, legal as LegalSlug);
  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="mb-8 text-3xl font-bold">{page.title}</h1>
      {page.sections.map((s) => (
        <section key={s.h} className="mb-6">
          <h2 className="mb-2 text-lg font-semibold">{s.h}</h2>
          {s.p.map((p) => (
            <p key={p} className="mb-2 text-ink/80">
              {p}
            </p>
          ))}
        </section>
      ))}
    </article>
  );
}
