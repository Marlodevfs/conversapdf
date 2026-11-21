'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Flag from '@/components/Flag';

type Lang = { code: string; name: string };

/**
 * Language picker. Each link points to the same page in the other language:
 * the target is read from the page's own hreflang alternates, with that
 * language's home page as the fallback (and as the no-JavaScript href).
 */
export default function LanguageMenu({ current, langs, label }: { current: string; langs: Lang[]; label: string }) {
  const pathname = usePathname();
  const [hrefs, setHrefs] = useState<Record<string, string>>({});
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const map: Record<string, string> = {};
    document.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]').forEach((l) => {
      try {
        map[l.hreflang] = new URL(l.href).pathname;
      } catch {}
    });
    setHrefs(map);
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current?.open && !ref.current.contains(e.target as Node)) ref.current.open = false;
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  return (
    <details ref={ref} className="relative">
      <summary
        aria-label={label}
        className="flex cursor-pointer list-none items-center gap-1.5 rounded-full border border-sand bg-white px-3 py-1.5 text-sm font-semibold uppercase text-ink/80 hover:border-leaf hover:text-ink [&::-webkit-details-marker]:hidden"
      >
        <Flag code={current} />
        {current}
      </summary>
      <ul className="absolute right-0 z-30 mt-2 min-w-[10rem] overflow-hidden rounded-xl border border-sand bg-white py-1 shadow-[0_16px_32px_-16px_rgba(20,32,26,.35)]">
        {langs.map((l) => (
          <li key={l.code}>
            <a
              href={hrefs[l.code] || `/${l.code}`}
              hrefLang={l.code}
              lang={l.code}
              aria-current={l.code === current ? 'true' : undefined}
              className={`flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-paper ${l.code === current ? 'font-bold text-leaf' : 'text-ink'}`}
            >
              <Flag code={l.code} />
              {l.name}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
