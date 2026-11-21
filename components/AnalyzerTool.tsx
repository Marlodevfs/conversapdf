'use client';

import { useMemo, useRef, useState } from 'react';
import { Loader2, Lock, Upload } from 'lucide-react';
import type { Locale } from '@/config/site';
import { ui, type UiStrings } from '@/lib/i18n/ui';
import { intlLocale } from '@/lib/i18n/pdf';
import { analyzer } from '@/lib/analyzer/i18n';
import type { LoadedChat } from '@/lib/whatsapp/load';
import { computeStats, type ChatStats } from '@/lib/whatsapp/stats';
import ConverterTool from '@/components/ConverterTool';

type ErrorCode = keyof UiStrings['tool']['errors'];
const MAX_BYTES = 1024 * 1024 * 1024;
const MAX_AUTHORS = 8;

function duration(ms: number) {
  const min = Math.round(ms / 60000);
  if (min < 1) return '< 1 min';
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} h ${String(m).padStart(2, '0')}` : `${h} h`;
}

export default function AnalyzerTool({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const a = analyzer(locale);
  const [chat, setChat] = useState<LoadedChat | null>(null);
  const [stats, setStats] = useState<ChatStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<ErrorCode | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const nf = useMemo(() => new Intl.NumberFormat(intlLocale[locale]), [locale]);
  const pf = useMemo(() => new Intl.NumberFormat(intlLocale[locale], { style: 'percent', maximumFractionDigits: 0 }), [locale]);
  const df = useMemo(() => {
    const f = new Intl.DateTimeFormat(intlLocale[locale], { timeZone: 'UTC', dateStyle: 'long' });
    // French writes the first day of the month as "1er".
    return { format: (t: number) => (locale === 'fr' ? f.format(t).replace(/^1 /, '1er ') : f.format(t)) };
  }, [locale]);
  const weekdayNames = useMemo(() => {
    const f = new Intl.DateTimeFormat(intlLocale[locale], { timeZone: 'UTC', weekday: 'short' });
    return Array.from({ length: 7 }, (_, i) => f.format(Date.UTC(2024, 0, 1 + i))); // 1 Jan 2024 is a Monday
  }, [locale]);

  const handleFiles = async (list: FileList | File[]) => {
    const files = Array.from(list);
    if (!files.length) return;
    setError(null);
    if (files.reduce((s, f) => s + f.size, 0) > MAX_BYTES) return setError('too-big');
    setLoading(true);
    try {
      const { loadChatFiles } = await import('@/lib/whatsapp/load');
      const loaded = await loadChatFiles(
        await Promise.all(files.map(async (f) => ({ name: f.name, bytes: new Uint8Array(await f.arrayBuffer()) })))
      );
      setChat(loaded);
      setStats(computeStats(loaded.messages));
      requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    } catch (e: any) {
      setError((e?.code as ErrorCode) || 'generic');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setChat(null);
    setStats(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  if (!chat || !stats) {
    return (
      <div className="rounded-[20px] border border-sand bg-surface p-4 shadow-[0_24px_60px_-28px_rgba(37,84,232,.35)] sm:p-6">
        {error && (
          <p role="alert" className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
            {t.tool.errors[error]}
          </p>
        )}
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
          }}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-[14px] border-2 border-dashed px-6 py-14 text-center transition-colors focus-within:border-leaf ${
            dragging ? 'border-leaf bg-leaf-light' : 'border-sand bg-paper/50 hover:border-leaf'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="mb-3 h-8 w-8 animate-spin text-leaf" aria-hidden />
              <span className="font-medium">{t.tool.loading}</span>
            </>
          ) : (
            <>
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-leaf-light">
                <Upload className="h-6 w-6 text-leaf" aria-hidden />
              </span>
              <span className="text-xl font-bold tracking-tight">{t.tool.drop}</span>
              <span className="mt-1 text-sm text-ink/70">{t.tool.dropHint}</span>
              <span className="mt-6 rounded-full bg-leaf px-6 py-3 font-semibold text-white shadow-[0_12px_24px_-10px_rgba(37,84,232,.7)] hover:bg-leaf-dark">{t.tool.choose}</span>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept=".zip,.txt,application/zip,text/plain,image/*,audio/*,video/*"
            multiple
            className="sr-only"
            onChange={(e) => e.target.files?.length && handleFiles(e.target.files)}
          />
        </label>
        <p className="mt-5 flex items-center gap-2 text-xs text-ink/70">
          <Lock className="h-3.5 w-3.5" aria-hidden /> {t.hero.privacy}
        </p>
      </div>
    );
  }

  const shown = stats.authors.slice(0, MAX_AUTHORS);
  const topAuthor = stats.authors[0]?.messages || 1;
  const maxHour = Math.max(...stats.byHour, 1);
  const peakHour = stats.byHour.indexOf(Math.max(...stats.byHour));
  const maxDay = Math.max(...stats.byWeekday, 1);

  return (
    <div ref={resultsRef} className="scroll-mt-24 space-y-5">
      <div className="grid gap-px overflow-hidden rounded-[20px] border border-sand bg-sand sm:grid-cols-3">
        {[
          [a.messages, nf.format(stats.messages), null],
          [a.words, nf.format(stats.words), null],
          [a.days, nf.format(stats.spanDays), a.since(df.format(stats.first))],
        ].map(([label, value, sub]) => (
          <div key={label} className="bg-surface p-6">
            <p className="text-sm font-medium text-ink/70">{label}</p>
            <p className="mt-1 text-4xl tabular-nums font-display font-extrabold tracking-display">{value}</p>
            {sub && <p className="mt-1 text-sm text-ink/70">{sub}</p>}
          </div>
        ))}
      </div>

      <section className="rounded-[20px] border border-sand bg-surface p-6">
        <h2 className="text-xl font-bold">{a.perPerson}</h2>
        <ul className="mt-5 space-y-5">
          {shown.map((p) => (
            <li key={p.name}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="truncate font-semibold">{p.name}</span>
                <span className="shrink-0 tabular-nums text-ink/70">
                  <strong className="font-bold text-ink">{nf.format(p.messages)}</strong> ({pf.format(p.messages / stats.messages)})
                </span>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-paper">
                <div className="h-full rounded-full bg-leaf" style={{ width: `${(p.messages / topAuthor) * 100}%` }} />
              </div>
              <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink/70">
                <span>
                  <strong className="font-semibold text-ink">{nf.format(Math.round((p.words / Math.max(p.messages - p.media, 1)) * 10) / 10)}</strong> {a.wordsPerMessage}
                </span>
                <span>
                  <strong className="font-semibold text-ink">{nf.format(p.starts)}</strong> {a.starts}
                </span>
                <span>
                  {p.replyMs != null ? (
                    <>
                      {a.reply} <strong className="font-semibold text-ink">{duration(p.replyMs)}</strong>
                    </>
                  ) : (
                    a.noReply
                  )}
                </span>
              </p>
            </li>
          ))}
        </ul>
        {stats.authors.length > MAX_AUTHORS && <p className="mt-4 text-sm text-ink/70">+ {stats.authors.length - MAX_AUTHORS}</p>}
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        <section className="rounded-[20px] border border-sand bg-surface p-6">
          <h2 className="text-xl font-bold">{a.hours}</h2>
          <div className="mt-6 flex h-36 items-end gap-[3px]" role="img" aria-label={`${a.hours}: ${peakHour}h`}>
            {stats.byHour.map((n, h) => (
              <div
                key={h}
                title={`${h}h: ${nf.format(n)}`}
                className={`flex-1 rounded-t-[3px] ${h === peakHour ? 'bg-leaf' : 'bg-leaf/25'}`}
                style={{ height: `${Math.max((n / maxHour) * 100, n ? 3 : 0)}%` }}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs tabular-nums text-ink/70" aria-hidden>
            <span>0h</span>
            <span>6h</span>
            <span>12h</span>
            <span>18h</span>
            <span>23h</span>
          </div>
        </section>

        <section className="rounded-[20px] border border-sand bg-surface p-6">
          <h2 className="text-xl font-bold">{a.weekdays}</h2>
          <ul className="mt-5 space-y-2.5">
            {stats.byWeekday.map((n, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <span className="w-10 shrink-0 capitalize text-ink/70">{weekdayNames[i]}</span>
                <span className="h-3 flex-1 overflow-hidden rounded-full bg-paper">
                  <span
                    className={`block h-full rounded-full ${n === maxDay ? 'bg-leaf' : 'bg-leaf/25'}`}
                    style={{ width: `${(n / maxDay) * 100}%` }}
                  />
                </span>
                <span className="w-14 shrink-0 text-right tabular-nums">{nf.format(n)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="rounded-[20px] border border-sand bg-surface p-6">
        <h2 className="text-xl font-bold">{a.emojis}</h2>
        {stats.topEmojis.length ? (
          <ul className="mt-5 flex flex-wrap gap-3">
            {stats.topEmojis.map((e) => (
              <li key={e.emoji} className="flex items-center gap-2 rounded-full bg-paper py-1.5 pl-2.5 pr-4">
                <span className="text-2xl leading-none">{e.emoji}</span>
                <span className="font-semibold tabular-nums">{nf.format(e.count)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-ink/70">{a.noEmojis}</p>
        )}
      </section>

      <div className="grid gap-px overflow-hidden rounded-[20px] border border-sand bg-sand sm:grid-cols-2 lg:grid-cols-4">
        {[
          [a.busiestDay, stats.busiestDay ? df.format(stats.busiestDay.day) : '–', stats.busiestDay ? a.messagesOn(nf.format(stats.busiestDay.count)) : ''],
          [a.streak, a.inARow(nf.format(stats.longestStreak)), a.activeDays(nf.format(stats.activeDays), nf.format(stats.spanDays))],
          [a.media, nf.format(stats.media), ''],
          [a.deleted, nf.format(stats.deleted), ''],
        ].map(([label, value, sub]) => (
          <div key={label} className="bg-surface p-5">
            <p className="text-sm font-medium text-ink/70">{label}</p>
            <p className="mt-1 text-lg font-bold">{value}</p>
            {sub && <p className="text-sm text-ink/70">{sub}</p>}
          </div>
        ))}
      </div>

      <section className="rounded-[20px] border border-leaf/20 bg-leaf-light p-4 sm:p-6">
        <div className="px-2 pb-5 pt-2">
          <h2 className="text-2xl font-display font-extrabold tracking-display sm:text-3xl">{a.ctaTitle}</h2>
          <p className="mt-2 max-w-[60ch] text-ink/75">{a.ctaText}</p>
        </div>
        <div className="text-ink">
          <ConverterTool key={chat.sha256} locale={locale} preloaded={chat} />
        </div>
      </section>

      <button type="button" onClick={reset} className="text-sm font-medium text-ink/70 underline underline-offset-4 hover:text-ink">
        {a.another}
      </button>
    </div>
  );
}
