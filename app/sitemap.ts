import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';
import { locales, siteConfig } from '@/config/site';
import { legalSlugs } from '@/lib/i18n/legal';
import { guideByKey, guideKeys } from '@/lib/guides';

export default function sitemap(): MetadataRoute.Sitemap {
  // Date of the last real content change: bump it when pages change.
  const updated = new Date('2026-11-21');
  const alternates = (suffix: string) => ({
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, `${siteConfig.url}/${l}${suffix}`])),
      'x-default': `${siteConfig.url}/en${suffix}`,
    },
  });
  return [
    ...locales.map((l) => ({
      url: `${siteConfig.url}/${l}`,
      lastModified: updated,
      changeFrequency: 'weekly' as const,
      priority: 1,
      alternates: alternates(''),
    })),
    ...locales.flatMap((l) =>
      guideKeys.map((k) => ({
        url: `${siteConfig.url}/${l}/${guideByKey(l, k).slug}`,
        lastModified: updated,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
        alternates: {
          languages: {
            ...Object.fromEntries(locales.map((x) => [x, `${siteConfig.url}/${x}/${guideByKey(x, k).slug}`])),
            'x-default': `${siteConfig.url}/en/${guideByKey('en', k).slug}`,
          },
        },
      }))
    ),
    ...locales.flatMap((l) =>
      legalSlugs.map((s) => ({
        url: `${siteConfig.url}/${l}/${s}`,
        lastModified: updated,
        changeFrequency: 'yearly' as const,
        priority: 0.2,
      }))
    ),
  ];
}
