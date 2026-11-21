import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale, locales } from '@/config/site';

/**
 * "/" sends visitors to their browser language (es, pt, it, fr) and serves
 * English otherwise. Crawlers send no Accept-Language and get English, whose
 * canonical URL is /en.
 */
function preferredLocale(header: string | null): string | null {
  if (!header) return null;
  const tags = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  const hit = tags.find((t) => (locales as readonly string[]).includes(t.lang));
  return hit ? hit.lang : null;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (pathname === '/') {
    const lang = preferredLocale(request.headers.get('accept-language'));
    if (lang && lang !== defaultLocale) {
      return NextResponse.redirect(new URL(`/${lang}${search}`, request.url), 307);
    }
    return NextResponse.rewrite(new URL(`/${defaultLocale}${search}`, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
