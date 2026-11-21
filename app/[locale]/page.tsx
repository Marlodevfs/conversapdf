import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Check, CreditCard, Lock, ShieldCheck } from 'lucide-react';
import SamplePage from '@/components/SamplePage';
import { isLocale, locales, siteConfig, type Locale } from '@/config/site';
import { ui } from '@/lib/i18n/ui';
import { intlLocale } from '@/lib/i18n/pdf';
import ConverterTool from '@/components/ConverterTool';
import Link from 'next/link';
import { guideChrome, guidesFor } from '@/lib/guides';
import { analyzer } from '@/lib/analyzer/i18n';

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
    twitter: { card: 'summary_large_image', title: t.meta.title, description: t.meta.description, images: [`${siteConfig.url}/${locale}/opengraph-image`] },
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
      browserRequirements: 'Requires JavaScript. Works in any modern browser on iPhone, Android, Windows and Mac.',
      featureList: t.plans.proof.features,
      publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url, email: siteConfig.contact.email },
      offers: (['text', 'photos', 'proof'] as const).map((e) => ({
        '@type': 'Offer',
        name: t.plans[e].name,
        price: siteConfig.prices[e].toFixed(2),
        priceCurrency: siteConfig.prices.currency,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: t.howTitle,
      description: t.howIntro,
      inLanguage: locale,
      totalTime: 'PT2M',
      tool: [{ '@type': 'HowToTool', name: 'WhatsApp' }],
      step: [
        ...t.iphone.steps.map((text, i) => ({ '@type': 'HowToStep', position: i + 1, name: `${t.iphone.title} ${i + 1}`, text })),
        { '@type': 'HowToStep', position: t.iphone.steps.length + 1, name: siteConfig.name, text: t.howTip, url: `${siteConfig.url}/${locale}#tool` },
      ],
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

      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-10 sm:pt-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)] lg:gap-16">
        <div>
          <h1 className="max-w-[17ch] text-[clamp(2.35rem,5.2vw,4.25rem)] font-extrabold leading-[1.02] tracking-display">{t.hero.title}</h1>
          <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-ink/70">{t.hero.subtitle}</p>
          <div className="mt-9">
            <ConverterTool locale={locale} />
          </div>
        </div>
        <div className="lg:pt-24">
          <SamplePage locale={locale} />
        </div>
      </section>

      <section id="how" className="scroll-mt-20 border-y border-sand bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-3xl font-extrabold tracking-display sm:text-4xl">{t.howTitle}</h2>
          <p className="mt-3 max-w-[60ch] text-ink/70">{t.howIntro}</p>
          <div className="mt-10 grid gap-12 md:grid-cols-2">
            {[t.iphone, t.android].map((device) => (
              <div key={device.title}>
                <h3 className="border-b-2 border-ink pb-3 text-xl font-bold">{device.title}</h3>
                <ol className="mt-2">
                  {device.steps.map((s, i) => (
                    <li key={s} className="flex gap-4 border-b border-sand py-3.5">
                      <span className="w-5 shrink-0 text-lg font-extrabold tabular-nums text-leaf">{i + 1}</span>
                      <span className="text-ink/85">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-[60ch] text-ink/70">{t.howTip}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-3xl font-extrabold tracking-display sm:text-4xl">{t.usesTitle}</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {t.uses.map((u) => (
            <div key={u.title}>
              <h3 className="text-lg font-bold">{u.title}</h3>
              <p className="mt-2 leading-relaxed text-ink/70">{u.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-10">
          <Link href={`/${locale}/${analyzer(locale).slug}`} className="font-semibold text-leaf underline decoration-2 underline-offset-4 hover:text-leaf-dark">
            {analyzer(locale).label}
          </Link>
        </p>
      </section>

      <section id="privacy" className="scroll-mt-20 border-y border-sand bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-3xl font-extrabold tracking-display sm:text-4xl">{t.privacySection.title}</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {t.privacySection.points.map((p, i) => {
              const Icon = [Lock, ShieldCheck, CreditCard][i] ?? Lock;
              return (
                <div key={p.title}>
                  <Icon className="h-6 w-6 text-leaf" aria-hidden />
                  <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink/70">{p.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16">
        <h2 className="text-3xl font-extrabold tracking-display sm:text-4xl">{t.pricingTitle}</h2>
        <p className="mt-3 max-w-[60ch] text-ink/70">{t.pricingIntro}</p>
        <div className="mt-10 grid items-stretch gap-4 md:grid-cols-3">
          {(['text', 'photos', 'proof'] as const).map((e) => {
            const featured = e === 'photos';
            return (
              <div
                key={e}
                className={`flex flex-col rounded-2xl p-7 ${featured ? 'bg-leaf-dark text-white' : 'border border-sand bg-white'}`}
              >
                <h3 className="text-lg font-bold">{t.plans[e].name}</h3>
                <p className="mt-4 text-5xl font-extrabold tabular-nums tracking-display">{price.format(siteConfig.prices[e])}</p>
                <p className={`mt-1 text-sm ${featured ? 'text-white/65' : 'text-ink/70'}`}>{t.oneTime}</p>
                <p className={`mt-5 ${featured ? 'text-white/85' : 'text-ink/75'}`}>{t.plans[e].desc}</p>
                <ul className="mt-5 space-y-2.5 text-sm">
                  {t.plans[e].features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${featured ? 'text-marker' : 'text-leaf'}`} aria-hidden /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <p className="mt-6 flex items-center gap-2 text-sm text-ink/70">
          <Lock className="h-4 w-4" aria-hidden /> {t.hero.privacy}
        </p>
      </section>

      <section id="guides" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16">
        <h2 className="text-3xl font-extrabold tracking-display sm:text-4xl">{guideChrome(locale).guidesTitle}</h2>
        <p className="mt-3 max-w-[60ch] text-ink/70">{guideChrome(locale).guidesIntro}</p>
        <ul className="mt-8 grid border-t border-sand md:grid-cols-2 md:gap-x-12">
          <li className="border-b border-sand">
            <Link href={`/${locale}/${analyzer(locale).slug}`} className="block py-4 font-medium decoration-leaf decoration-2 underline-offset-4 hover:underline">
              {analyzer(locale).label}
            </Link>
          </li>
          {guidesFor(locale).map((g) => (
            <li key={g.key} className="border-b border-sand">
              <Link href={`/${locale}/${g.slug}`} className="block py-4 font-medium decoration-leaf decoration-2 underline-offset-4 hover:underline">
                {g.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-5 py-16">
        <h2 className="text-3xl font-extrabold tracking-display sm:text-4xl">{t.faqTitle}</h2>
        <div className="mt-8 border-t border-sand">
          {t.faqs.map((f) => (
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
