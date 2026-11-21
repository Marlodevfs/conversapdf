import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Check, ShieldCheck } from 'lucide-react';
import { isLocale, locales, siteConfig, type Locale } from '@/config/site';
import { ui } from '@/lib/i18n/ui';
import { intlLocale } from '@/lib/i18n/pdf';
import ConverterTool from '@/components/ConverterTool';

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = ui(locale);
  const languages: Record<string, string> = Object.fromEntries(locales.map((l) => [l, `${siteConfig.url}/${l}`]));
  languages['x-default'] = `${siteConfig.url}/en`;
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: { canonical: `${siteConfig.url}/${locale}`, languages },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `${siteConfig.url}/${locale}`,
      siteName: siteConfig.name,
      locale: intlLocale[locale].replace('-', '_'),
      type: 'website',
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = ui(locale as Locale);
  const price = new Intl.NumberFormat(intlLocale[locale], { style: 'currency', currency: siteConfig.prices.currency });

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: siteConfig.name,
      url: `${siteConfig.url}/${locale}`,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      inLanguage: locale,
      description: t.meta.description,
      offers: (['text', 'photos', 'proof'] as const).map((e) => ({
        '@type': 'Offer',
        name: t.plans[e].name,
        price: siteConfig.prices[e].toFixed(2),
        priceCurrency: siteConfig.prices.currency,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: t.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="mx-auto max-w-5xl px-5 pb-10 pt-12 sm:pt-16">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-leaf">{t.hero.kicker}</p>
        <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">{t.hero.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink/75">{t.hero.subtitle}</p>
        <p className="mt-3 flex items-center gap-2 text-sm font-medium text-leaf-dark">
          <ShieldCheck className="h-4 w-4" aria-hidden /> {t.hero.privacy}
        </p>
        <div className="mt-8">
          <ConverterTool locale={locale} />
        </div>
      </section>

      <section id="how" className="mx-auto max-w-5xl scroll-mt-20 px-5 py-12">
        <h2 className="text-2xl font-bold sm:text-3xl">{t.howTitle}</h2>
        <p className="mt-2 max-w-2xl text-ink/75">{t.howIntro}</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {[t.iphone, t.android].map((device) => (
            <div key={device.title} className="rounded-2xl border border-sand bg-white p-6">
              <h3 className="mb-3 text-lg font-semibold">{device.title}</h3>
              <ol className="list-decimal space-y-2 pl-5 text-ink/80">
                {device.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <p className="mt-5 text-ink/75">{t.howTip}</p>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12">
        <h2 className="text-2xl font-bold sm:text-3xl">{t.usesTitle}</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {t.uses.map((u) => (
            <div key={u.title} className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-2 font-semibold">{u.title}</h3>
              <p className="text-sm text-ink/75">{u.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-5xl scroll-mt-20 px-5 py-12">
        <h2 className="text-2xl font-bold sm:text-3xl">{t.pricingTitle}</h2>
        <p className="mt-2 text-ink/75">{t.pricingIntro}</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {(['text', 'photos', 'proof'] as const).map((e) => (
            <div key={e} className={`rounded-2xl border bg-white p-6 ${e === 'photos' ? 'border-leaf shadow-md' : 'border-sand'}`}>
              <h3 className="text-lg font-semibold">{t.plans[e].name}</h3>
              <p className="mt-1 text-3xl font-bold">{price.format(siteConfig.prices[e])}</p>
              <p className="text-xs text-ink/60">{t.oneTime}</p>
              <p className="mt-3 text-sm text-ink/75">{t.plans[e].desc}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {t.plans[e].features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf" aria-hidden /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-5 py-12">
        <h2 className="text-2xl font-bold sm:text-3xl">{t.faqTitle}</h2>
        <div className="mt-6 divide-y divide-sand rounded-2xl border border-sand bg-white">
          {t.faqs.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="cursor-pointer list-none font-semibold">{f.q}</summary>
              <p className="mt-2 text-ink/75">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
