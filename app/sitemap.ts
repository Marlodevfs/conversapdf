import type { MetadataRoute } from 'next';
import { locales, siteConfig } from '@/config/site';
import { legalSlugs } from '@/lib/i18n/legal';

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
      legalSlugs.map((s) => ({
        url: `${siteConfig.url}/${l}/${s}`,
        lastModified: updated,
        changeFrequency: 'yearly' as const,
        priority: 0.2,
      }))
    ),
  ];
}
