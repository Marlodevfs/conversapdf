'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { MessageCircle, Search } from 'lucide-react';
import type { Locale } from '@/config/site';
import { ui } from '@/lib/i18n/ui';
import { intlLocale } from '@/lib/i18n/pdf';
import type { ThreadChoice } from '@/lib/whatsapp/load';

type Pending = { threads: ThreadChoice[]; resolve: (id: string) => void; reject: (e: unknown) => void };

/**
 * An Instagram or Messenger export holds every conversation of the account:
 * the loader asks through `pickThread` which one to turn into a PDF, and
 * `picker` shows the list until the user answers.
 */
export function useThreadPicker(locale: Locale) {
  const [pending, setPending] = useState<Pending | null>(null);
  const pickThread = useCallback(
    (threads: ThreadChoice[]) => new Promise<string>((resolve, reject) => setPending({ threads, resolve, reject })),
    []
  );
  const picker = pending ? (
    <ThreadList
      locale={locale}
      threads={pending.threads}
      onPick={(id) => {
        setPending(null);
        pending.resolve(id);
      }}
      onCancel={() => {
        setPending(null);
        pending.reject(Object.assign(new Error('cancelled'), { code: 'cancelled' }));
      }}
    />
  ) : null;
  return { pickThread, picker };
}

function ThreadList({
  locale,
  threads,
  onPick,
  onCancel,
}: {
  locale: Locale;
  threads: ThreadChoice[];
  onPick: (id: string) => void;
  onCancel: () => void;
}) {
  const t = ui(locale).tool;
  const [query, setQuery] = useState('');
  const dateFmt = useMemo(() => new Intl.DateTimeFormat(intlLocale[locale], { dateStyle: 'medium' }), [locale]);
  const shown = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    return q ? threads.filter((th) => th.title.toLocaleLowerCase().includes(q)) : threads;
  }, [threads, query]);

  return (
    <div>
      <p className="text-lg font-bold">{t.threadsTitle}</p>
      <p className="mt-1 text-sm text-ink/70">{t.threadsHint(threads.length)}</p>
      {threads.length > 6 && (
        <label className="mt-4 flex items-center gap-2 rounded-lg border border-sand bg-paper/50 px-3 focus-within:border-leaf">
          <Search className="h-4 w-4 shrink-0 text-ink/50" aria-hidden />
          <span className="sr-only">{t.threadsSearch}</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.threadsSearch}
            className="w-full bg-transparent py-2.5 text-sm outline-none"
          />
        </label>
      )}
      <ul className="mt-3 max-h-[22rem] divide-y divide-sand overflow-y-auto rounded-lg border border-sand">
        {shown.map((th) => (
          <li key={th.id}>
            <button
              type="button"
              onClick={() => onPick(th.id)}
              className="flex w-full items-center gap-3 px-3 py-3 text-left hover:bg-leaf-light focus-visible:bg-leaf-light focus-visible:outline-none"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-leaf-light text-leaf">
                <MessageCircle className="h-4 w-4" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold">{th.title}</span>
                <span className="block text-xs text-ink/70">
                  {t.threadsCount(th.count)}
                  {th.last ? ` · ${dateFmt.format(th.last)}` : ''}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={onCancel} className="mt-4 text-sm font-medium text-ink/70 underline-offset-2 hover:underline">
        {t.threadsCancel}
      </button>
    </div>
  );
}
