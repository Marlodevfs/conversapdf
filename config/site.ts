export const locales = ['es', 'pt', 'it', 'fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const siteConfig = {
  name: 'ConversaPDF',
  domain: 'conversapdf.com',
  url: 'https://conversapdf.com',
  contact: { email: 'support@conversapdf.com' },
  /** GoatCounter site code (https://<code>.goatcounter.com). Empty = no analytics. */
  goatcounter: 'conversapdf',
  /** Google Tag Manager container (Google Analytics), loaded only after cookie consent. */
  gtmId: 'GTM-K32B57SV',
  /**
   * Legal notice. TO FILL IN before selling: French law (LCEN art. 6) requires
   * the publisher's identity on the site. Empty fields are simply not displayed.
   */
  legal: {
    publisherName: 'ConversaPDF',
    publisherStatus: '',
    publisherAddress: '',
    host: { name: 'Cloudflare, Inc.', address: '101 Townsend St, San Francisco, CA 94107, USA' },
  },
  /** Prices shown on the site. Must match the Polar prices. */
  prices: { text: 4.99, photos: 8.99, proof: 14.99, currency: 'EUR' },
};
