import type { Locale } from '@/config/site';
import { chromeDe, guidesDe } from './de';
import { chromeEn, guidesEn } from './en';
import { chromeEs, guidesEs } from './es';
import { chromeFr, guidesFr } from './fr';
import { chromeIt, guidesIt } from './it';
import { chromePt, guidesPt } from './pt';
import type { Guide, GuideChrome, GuideKey } from './types';

export * from './types';

const all: Record<Locale, Guide[]> = { es: guidesEs, pt: guidesPt, it: guidesIt, fr: guidesFr, de: guidesDe, en: guidesEn };
const chromes: Record<Locale, GuideChrome> = { es: chromeEs, pt: chromePt, it: chromeIt, fr: chromeFr, de: chromeDe, en: chromeEn };

export const guidesFor = (locale: Locale) => all[locale];
export const guideChrome = (locale: Locale) => chromes[locale];
export const guideBySlug = (locale: Locale, slug: string) => all[locale].find((g) => g.slug === slug);
export const guideByKey = (locale: Locale, key: GuideKey) => all[locale].find((g) => g.key === key)!;
