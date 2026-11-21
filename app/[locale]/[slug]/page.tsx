import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, locales, siteConfig, type Locale } from '@/config/site';
import { legalPage, legalSlugs, type LegalSlug } from '@/lib/i18n/legal';
import { guideBySlug, guideByKey, guideChrome, guidesFor, type Guide } from '@/lib/guides';
import { intlLocale } from '@/lib/i18n/pdf';
import { ui } from '@/lib/i18n/ui';
import ConverterTool from '@/components/ConverterTool';
import AnalyzerTool from '@/components/AnalyzerTool';
import { analyzer } from '@/lib/analyzer/i18n';

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => [
    ...legalSlugs.map((slug) => ({ locale, slug })),
    ...guidesFor(locale).map((g) => ({ locale, slug: g.slug })),
    { locale, slug: analyzer(locale).slug },
  ]);
}

const isLegal = (s: string): s is LegalSlug => (legalSlugs as readonly string[]).includes(s);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  if (isLegal(slug)) {
    const page = legalPage(locale, slug);
    const first = page.sections[0]?.p[0] || page.title;
    return {
      title: `${page.title} | ConversaPDF`,
      description: first.length > 155 ? `${first.slice(0, 152).replace(/\s+\S*$/, '')}…` : first,
      alternates: {
        canonical: `${siteConfig.url}/${locale}/${slug}`,
        languages: Object.fromEntries(locales.map((l) => [l, `${siteConfig.url}/${l}/${slug}`])),
      },
    };
  }
  if (slug === analyzer(locale).slug) {
    const a = analyzer(locale);
    const languages: Record<string, string> = Object.fromEntries(locales.map((l) => [l, `${siteConfig.url}/${l}/${analyzer(l).slug}`]));
    languages['x-default'] = `${siteConfig.url}/en/${analyzer('en').slug}`;
    const url = `${siteConfig.url}/${locale}/${a.slug}`;
    const image = `${siteConfig.url}/${locale}/opengraph-image`;
    return {
      title: { absolute: a.metaTitle },
      description: a.metaDescription,
      alternates: { canonical: url, languages },
      openGraph: { title: a.metaTitle, description: a.metaDescription, url, siteName: siteConfig.name, locale: intlLocale[locale].replace('-', '_'), type: 'website', images: [{ url: image, width: 1200, height: 630 }] },
      twitter: { card: 'summary_large_image', title: a.metaTitle, description: a.metaDescription, images: [image] },
    };
  }
  const g = guideBySlug(locale, slug);
  if (!g) return {};
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, `${siteConfig.url}/${l}/${guideByKey(l, g.key).slug}`])
  );
  languages['x-default'] = `${siteConfig.url}/en/${guideByKey('en', g.key).slug}`;
  const url = `${siteConfig.url}/${locale}/${g.slug}`;
  return {
    title: { absolute: g.metaTitle },
    description: g.metaDescription,
    alternates: { canonical: url, languages },
    openGraph: {
      title: g.metaTitle,
      description: g.metaDescription,
      url,
      siteName: siteConfig.name,
      locale: intlLocale[locale].replace('-', '_'),
      type: 'article',
      images: [{ url: `${siteConfig.url}/${locale}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: g.metaTitle, description: g.metaDescription, images: [`${siteConfig.url}/${locale}/opengraph-image`] },
  };
}

export default async function SlugPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  if (isLegal(slug)) return <LegalArticle locale={locale} slug={slug} />;
  if (slug === analyzer(locale).slug) return <AnalyzerArticle locale={locale} />;
  const g = guideBySlug(locale, slug);
  if (!g) notFound();
  return <GuideArticle locale={locale} guide={g} />;
}

function LegalArticle({ locale, slug }: { locale: Locale; slug: LegalSlug }) {
  const page = legalPage(locale, slug);
  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="mb-8 text-4xl font-display font-extrabold tracking-display">{page.title}</h1>
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

function GuideArticle({ locale, guide: g }: { locale: Locale; guide: Guide }) {
  const c = guideChrome(locale);
  const t = ui(locale);
  const url = `${siteConfig.url}/${locale}/${g.slug}`;
  const howTo = g.sections.find((s) => s.steps);
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: c.breadcrumbHome, item: `${siteConfig.url}/${locale}` },
        { '@type': 'ListItem', position: 2, name: g.h1, item: url },
      ],
    },
    ...(howTo
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: g.h1,
            description: g.metaDescription,
            inLanguage: locale,
            step: howTo.steps!.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, text: s })),
          },
        ]
      : []),
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: g.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];
  const related = guidesFor(locale).filter((x) => x.key !== g.key);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="mx-auto max-w-3xl px-5 pb-6 pt-10">
        <nav className="mb-4 text-sm text-ink/70">
          <Link href={`/${locale}`} className="hover:text-leaf">{c.breadcrumbHome}</Link>
          <span className="mx-2">›</span>
          <span>{c.guidesTitle}</span>
        </nav>
        <h1 className="text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.05] font-display font-extrabold tracking-display">{g.h1}</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink/75">{g.intro}</p>

        {g.sections.map((s) => (
          <section key={s.h} className="mt-8">
            <h2 className="mb-3 text-2xl font-bold tracking-tight">{s.h}</h2>
            {s.p?.map((p) => (
              <p key={p} className="mb-3 text-ink/80">{p}</p>
            ))}
            {s.steps && (
              <ol className="list-decimal space-y-2 pl-6 text-ink/80 marker:font-semibold marker:text-leaf">
                {s.steps.map((x) => <li key={x}>{x}</li>)}
              </ol>
            )}
            {s.bullets && (
              <ul className="list-disc space-y-2 pl-6 text-ink/80 marker:text-leaf">
                {s.bullets.map((x) => <li key={x}>{x}</li>)}
              </ul>
            )}
          </section>
        ))}
      </article>

      <section className="mx-auto max-w-6xl px-5 py-8">
        <h2 className="mb-5 text-2xl font-bold">{c.toolTitle}</h2>
        <ConverterTool locale={locale} />
      </section>

      <section className="mx-auto max-w-3xl px-5 py-8">
        <h2 className="text-2xl font-bold">{t.faqTitle}</h2>
        <div className="mt-6 border-t border-sand">
          {g.faqs.map((f) => (
            <details key={f.q} className="group border-b border-sand">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="mt-1 text-xl leading-none text-leaf transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="-mt-1 max-w-[65ch] pb-6 leading-relaxed text-ink/75">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <nav className="mx-auto max-w-3xl px-5 py-8">
        <h2 className="mb-4 text-xl font-bold">{c.related}</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {related.map((r) => (
            <li key={r.key}>
              <Link href={`/${locale}/${r.slug}`} className="block rounded-xl border border-sand bg-surface px-4 py-3 font-medium hover:border-leaf">
                {r.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

function AnalyzerArticle({ locale }: { locale: Locale }) {
  const a = analyzer(locale);
  const c = guideChrome(locale);
  const t = ui(locale);
  const url = `${siteConfig.url}/${locale}/${a.slug}`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: a.h1,
      url,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      inLanguage: locale,
      description: a.metaDescription,
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: siteConfig.prices.currency },
      featureList: a.what,
      publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: c.breadcrumbHome, item: `${siteConfig.url}/${locale}` },
        { '@type': 'ListItem', position: 2, name: a.h1, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: a.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="mx-auto max-w-5xl px-5 pb-10 pt-10 sm:pt-14">
        <nav className="mb-4 text-sm text-ink/70">
          <Link href={`/${locale}`} className="hover:text-leaf">{c.breadcrumbHome}</Link>
        </nav>
        <h1 className="max-w-[18ch] text-[clamp(2.35rem,5.2vw,4rem)] leading-[1.02] font-display font-extrabold tracking-display">{a.h1}</h1>
        <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-ink/70">{a.intro}</p>
        <div className="mt-9">
          <AnalyzerTool locale={locale} />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12">
        <h2 className="text-3xl font-display font-extrabold tracking-display">{a.whatTitle}</h2>
        <ul className="mt-6 grid gap-x-12 border-t border-sand md:grid-cols-2">
          {a.what.map((w) => (
            <li key={w} className="border-b border-sand py-4 text-ink/80">{w}</li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-12">
        <h2 className="text-3xl font-display font-extrabold tracking-display">{t.faqTitle}</h2>
        <div className="mt-8 border-t border-sand">
          {a.faqs.map((f) => (
            <details key={f.q} className="group border-b border-sand">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="mt-1 text-xl leading-none text-leaf transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="-mt-1 max-w-[65ch] pb-6 leading-relaxed text-ink/75">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
