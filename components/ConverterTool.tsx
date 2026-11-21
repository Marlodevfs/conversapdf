'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { CheckCircle2, FileText, Loader2, Lock, Upload } from 'lucide-react';
import type { Locale } from '@/config/site';
import { siteConfig } from '@/config/site';
import { ui, type UiStrings } from '@/lib/i18n/ui';
import { intlLocale } from '@/lib/i18n/pdf';
import type { LoadedChat } from '@/lib/whatsapp/load';
import type { Edition, PdfImage } from '@/lib/pdf/ChatDocument';
import { buyEdition, PAYMENTS_ENABLED, verifyPurchase } from '@/lib/paddle-client';
import { countPhotos, preparePhotos } from '@/lib/images';

type Phase = 'idle' | 'loading' | 'ready' | 'working' | 'done';
type ErrorCode = keyof UiStrings['tool']['errors'];

const EDITIONS: Edition[] = ['text', 'photos', 'proof'];
const RANK: Record<Edition, number> = { text: 0, photos: 1, proof: 2 };
const MAX_BYTES = 1024 * 1024 * 1024;

const dayKey = (t: number) => new Date(t).toISOString().slice(0, 10);

function slug(s: string) {
  return (
    s
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase()
      .slice(0, 40) || 'whatsapp'
  );
}

async function buildPdf(opts: {
  chat: LoadedChat;
  locale: Locale;
  edition: Edition;
  me: string | null;
  from: string;
  to: string;
  preview: boolean;
  images: Record<string, PdfImage>;
}): Promise<Blob> {
  const [{ pdf }, { ChatDocument }, { registerPdfFonts }] = await Promise.all([
    import('@react-pdf/renderer'),
    import('@/lib/pdf/ChatDocument'),
    import('@/lib/pdf/fonts'),
  ]);
  registerPdfFonts();
  const { chat } = opts;
  const messages = chat.messages.filter((m) => {
    const d = dayKey(m.time);
    return d >= opts.from && d <= opts.to;
  });
  const doc = (
    <ChatDocument
      locale={opts.locale}
      edition={opts.edition}
      title={chat.title}
      authors={chat.authors}
      messages={messages}
      me={opts.me}
      images={opts.images}
      sha256={chat.sha256}
      sourceName={chat.sourceName}
      sourceSize={chat.sourceSize}
      generatedAt={Date.now()}
      hasSeconds={chat.hasSeconds}
      preview={opts.preview}
    />
  );
  return pdf(doc).toBlob();
}

export default function ConverterTool({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const [phase, setPhase] = useState<Phase>('idle');
  const [error, setError] = useState<ErrorCode | null>(null);
  const [chat, setChat] = useState<LoadedChat | null>(null);
  const [me, setMe] = useState<string>('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [status, setStatus] = useState('');
  const [dragging, setDragging] = useState(false);
  const [unlocked, setUnlocked] = useState<Edition | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const photoCache = useRef<Record<string, PdfImage> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const price = useMemo(
    () => new Intl.NumberFormat(intlLocale[locale], { style: 'currency', currency: siteConfig.prices.currency }),
    [locale]
  );
  const dateFmt = useMemo(
    () => new Intl.DateTimeFormat(intlLocale[locale], { timeZone: 'UTC', dateStyle: 'medium' }),
    [locale]
  );

  const reset = () => {
    setPhase('idle');
    setChat(null);
    setError(null);
    setUnlocked(null);
    setDownloadUrl(null);
    photoCache.current = null;
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleFile = useCallback(async (file: File) => {
    setError(null);
    if (file.size > MAX_BYTES) return setError('too-big');
    setPhase('loading');
    try {
      const { loadChatFile } = await import('@/lib/whatsapp/load');
      const bytes = new Uint8Array(await file.arrayBuffer());
      const loaded = await loadChatFile({ name: file.name, bytes });
      setChat(loaded);
      setMe('');
      setFrom(dayKey(loaded.messages[0].time));
      setTo(dayKey(loaded.messages[loaded.messages.length - 1].time));
      setUnlocked(null);
      setDownloadUrl(null);
      photoCache.current = null;
      setPhase('ready');
    } catch (e: any) {
      setError((e?.code as ErrorCode) || 'generic');
      setPhase('idle');
    }
  }, []);

  const photos = async (edition: Edition): Promise<Record<string, PdfImage>> => {
    if (!chat || edition === 'text') return {};
    if (photoCache.current) return photoCache.current;
    const wanted = chat.messages.map((m) => m.attachment).filter(Boolean) as string[];
    photoCache.current = await preparePhotos(chat.media, wanted, (d, total) => setStatus(t.tool.preparingPhotos(d, total)));
    return photoCache.current;
  };

  const preview = async () => {
    if (!chat) return;
    // Open the tab now (inside the click) so pop-up blockers allow it.
    const win = window.open('', '_blank');
    setPhase('working');
    setStatus(t.tool.previewing);
    try {
      const images = await photos('photos');
      setStatus(t.tool.previewing);
      const blob = await buildPdf({ chat, locale, edition: 'photos', me: me || null, from, to, preview: true, images });
      const url = URL.createObjectURL(blob);
      if (win) win.location.href = url;
      else window.location.href = url;
      setPhase('ready');
    } catch {
      win?.close();
      setError('generic');
      setPhase('ready');
    }
  };

  const download = (blob: Blob, edition: Edition) => {
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slug(chat?.title || chat?.authors.join('-') || 'whatsapp')}-${edition}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const purchase = async (edition: Edition) => {
    if (!chat) return;
    setError(null);
    try {
      let granted = unlocked && RANK[unlocked] >= RANK[edition] ? unlocked : null;
      if (!granted) {
        const txn = await buyEdition(edition, locale);
        if (!txn) return; // checkout closed
        setPhase('working');
        setStatus(t.tool.generating);
        granted = await verifyPurchase(txn);
        if (!granted) {
          setError('payment');
          setPhase('ready');
          return;
        }
        setUnlocked(granted);
      }
      setPhase('working');
      const images = await photos(granted);
      setStatus(t.tool.generating);
      const blob = await buildPdf({ chat, locale, edition: granted, me: me || null, from, to, preview: false, images });
      download(blob, granted);
      setPhase('done');
    } catch {
      setError('generic');
      setPhase('ready');
    }
  };

  const attachments = chat ? (chat.messages.map((m) => m.attachment).filter(Boolean) as string[]) : [];
  const photoCount = chat ? countPhotos(chat.media, attachments) : 0;
  const messageCount = chat ? chat.messages.filter((m) => m.author).length : 0;

  return (
    <div id="tool" className="rounded-2xl border border-sand bg-white p-5 shadow-sm sm:p-8">
      {error && (
        <p role="alert" className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          {t.tool.errors[error]}
        </p>
      )}

      {(phase === 'idle' || phase === 'loading') && (
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const f = e.dataTransfer.files?.[0];
            if (f) handleFile(f);
          }}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-12 text-center transition ${
            dragging ? 'border-leaf bg-leaf-light' : 'border-sand hover:border-leaf'
          }`}
        >
          {phase === 'loading' ? (
            <>
              <Loader2 className="mb-3 h-8 w-8 animate-spin text-leaf" aria-hidden />
              <span className="font-medium">{t.tool.loading}</span>
            </>
          ) : (
            <>
              <Upload className="mb-3 h-8 w-8 text-leaf" aria-hidden />
              <span className="text-lg font-semibold">{t.tool.drop}</span>
              <span className="mt-1 text-sm text-ink/60">{t.tool.dropHint}</span>
              <span className="mt-5 rounded-full bg-leaf px-5 py-2.5 text-sm font-semibold text-white">{t.tool.choose}</span>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept=".zip,.txt,application/zip,text/plain"
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
        </label>
      )}

      {chat && phase !== 'idle' && phase !== 'loading' && (
        <div>
          <div className="mb-5 flex items-center gap-2 text-leaf">
            <CheckCircle2 className="h-5 w-5" aria-hidden />
            <h3 className="text-lg font-semibold text-ink">{t.tool.summary}</h3>
          </div>
          <dl className="mb-6 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            <div className="rounded-lg bg-paper p-3">
              <dt className="text-ink/60">{t.tool.participants}</dt>
              <dd className="font-semibold">{chat.authors.length}</dd>
            </div>
            <div className="rounded-lg bg-paper p-3">
              <dt className="text-ink/60">{t.tool.messages}</dt>
              <dd className="font-semibold">{messageCount.toLocaleString(intlLocale[locale])}</dd>
            </div>
            <div className="rounded-lg bg-paper p-3">
              <dt className="text-ink/60">{t.tool.photos}</dt>
              <dd className="font-semibold">{photoCount}</dd>
            </div>
            <div className="rounded-lg bg-paper p-3">
              <dt className="text-ink/60">{t.tool.period}</dt>
              <dd className="font-semibold">
                {dateFmt.format(chat.messages[0].time)} – {dateFmt.format(chat.messages[chat.messages.length - 1].time)}
              </dd>
            </div>
          </dl>

          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <label className="text-sm sm:col-span-3">
              <span className="mb-1 block font-medium">{t.tool.me}</span>
              <select
                value={me}
                onChange={(e) => setMe(e.target.value)}
                className="w-full rounded-lg border border-sand bg-white px-3 py-2"
                disabled={phase === 'working'}
              >
                <option value="">{t.tool.meNone}</option>
                {chat.authors.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium">{t.tool.from}</span>
              <input
                type="date"
                value={from}
                min={dayKey(chat.messages[0].time)}
                max={to}
                onChange={(e) => e.target.value && setFrom(e.target.value)}
                className="w-full rounded-lg border border-sand px-3 py-2"
                disabled={phase === 'working'}
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium">{t.tool.to}</span>
              <input
                type="date"
                value={to}
                min={from}
                max={dayKey(chat.messages[chat.messages.length - 1].time)}
                onChange={(e) => e.target.value && setTo(e.target.value)}
                className="w-full rounded-lg border border-sand px-3 py-2"
                disabled={phase === 'working'}
              />
            </label>
            <div className="flex items-end">
              <button
                type="button"
                onClick={preview}
                disabled={phase === 'working'}
                className="w-full rounded-lg border border-leaf px-4 py-2 text-sm font-semibold text-leaf hover:bg-leaf-light disabled:opacity-50"
              >
                {t.tool.preview}
              </button>
            </div>
          </div>

          {phase === 'working' && (
            <p className="mb-4 flex items-center gap-2 rounded-lg bg-leaf-light px-4 py-3 text-sm font-medium text-leaf-dark" aria-live="polite">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> {status}
            </p>
          )}

          {phase === 'done' && downloadUrl && (
            <div className="mb-4 rounded-lg bg-leaf-light px-4 py-3 text-sm text-leaf-dark">
              <p className="font-semibold">{t.tool.downloaded}</p>
              <div className="mt-2 flex flex-wrap gap-4">
                <a href={downloadUrl} download className="underline">
                  {t.tool.downloadAgain}
                </a>
                <button type="button" onClick={reset} className="underline">
                  {t.tool.another}
                </button>
              </div>
            </div>
          )}

          <h4 className="mb-3 font-semibold">{t.tool.choosePlan}</h4>
          {!PAYMENTS_ENABLED && <p className="mb-3 text-sm text-ink/70">{t.tool.paymentsOff}</p>}
          <div className="grid gap-3 sm:grid-cols-3">
            {EDITIONS.map((e) => {
              const plan = t.plans[e];
              const owned = unlocked != null && RANK[unlocked] >= RANK[e];
              return (
                <div key={e} className={`flex flex-col rounded-xl border p-4 ${e === 'photos' ? 'border-leaf' : 'border-sand'}`}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold">{plan.name}</span>
                    <span className="font-bold">{price.format(siteConfig.prices[e])}</span>
                  </div>
                  <p className="mt-1 flex-1 text-xs text-ink/70">{plan.desc}</p>
                  <button
                    type="button"
                    onClick={() => purchase(e)}
                    disabled={phase === 'working' || (!PAYMENTS_ENABLED && !owned)}
                    className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-leaf px-3 py-2 text-sm font-semibold text-white hover:bg-leaf-dark disabled:opacity-50"
                  >
                    {owned ? <FileText className="h-4 w-4" aria-hidden /> : <Lock className="h-4 w-4" aria-hidden />}
                    {t.tool.buy}
                  </button>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-ink/60">{t.oneTime}</p>
          {phase !== 'working' && phase !== 'done' && (
            <button type="button" onClick={reset} className="mt-4 text-sm text-ink/60 underline">
              {t.tool.another}
            </button>
          )}
        </div>
      )}

      <p className="mt-5 flex items-center gap-2 text-xs text-ink/60">
        <Lock className="h-3.5 w-3.5" aria-hidden /> {t.hero.privacy}
      </p>
    </div>
  );
}
