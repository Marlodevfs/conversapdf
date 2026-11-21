import type { Faq } from '@/lib/i18n/ui';

export const guideKeys = ['iphone', 'android', 'photos', 'evidence', 'group', 'print', 'txt', 'save'] as const;
export type GuideKey = (typeof guideKeys)[number];

export interface GuideSection {
  h: string;
  p?: string[];
  steps?: string[];
  bullets?: string[];
}

export interface Guide {
  key: GuideKey;
  slug: string;
  /** Short label used in link lists. */
  label: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: GuideSection[];
  faqs: Faq[];
}

export interface GuideChrome {
  guidesTitle: string;
  guidesIntro: string;
  related: string;
  toolTitle: string;
  breadcrumbHome: string;
}
