'use client';

import { useEffect, useState } from 'react';
import type { Locale } from '@/config/site';
import { siteConfig } from '@/config/site';

/**
 * Cookie banner (GDPR/CNIL): Google Tag Manager (Google Analytics) is only
 * loaded after the visitor accepts. Accept and decline have equal weight.
 * The choice is kept on this device; the footer's "Cookies" link reopens it.
 */
const KEY = 'cpdf-consent';
const OPEN_EVENT = 'cpdf-open-consent';

const copy: Record<Locale, { text: string; accept: string; decline: string; more: string }> = {
  es: { text: 'Usamos cookies de Google Analytics para medir la audiencia, solo si aceptas. Tus conversaciones nunca se envían.', accept: 'Aceptar', decline: 'Rechazar', more: 'Más información' },
  pt: { text: 'Usamos cookies do Google Analytics para medir a audiência, só se você aceitar. Suas conversas nunca são enviadas.', accept: 'Aceitar', decline: 'Recusar', more: 'Saiba mais' },
  it: { text: 'Usiamo i cookie di Google Analytics per misurare il pubblico, solo se accetti. Le tue chat non vengono mai inviate.', accept: 'Accetta', decline: 'Rifiuta', more: 'Maggiori informazioni' },
  fr: { text: "Nous utilisons les cookies de Google Analytics pour mesurer l'audience, seulement si vous acceptez. Vos conversations ne sont jamais envoyées.", accept: 'Accepter', decline: 'Refuser', more: 'En savoir plus' },
  en: { text: 'We use Google Analytics cookies to measure visits, only if you agree. Your chats are never sent.', accept: 'Accept', decline: 'Decline', more: 'Learn more' },
};

export const cookieLinkLabel: Record<Locale, string> = { es: 'Cookies', pt: 'Cookies', it: 'Cookie', fr: 'Cookies', en: 'Cookies' };

function loadGtm() {
  const w = window as any;
  if (!siteConfig.gtmId || w.__cpdfGtm) return;
  w.__cpdfGtm = true;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${siteConfig.gtmId}`;
  document.head.appendChild(s);
}

const read = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};
const write = (v: string) => {
  try {
    localStorage.setItem(KEY, v);
  } catch {}
};

export default function CookieConsent({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const t = copy[locale];

  useEffect(() => {
    const choice = read();
    if (choice === 'granted') loadGtm();
    else if (choice !== 'denied') setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  if (!open) return null;
  const decide = (v: 'granted' | 'denied') => {
    write(v);
    setOpen(false);
    if (v === 'granted') loadGtm();
    else if ((window as any).__cpdfGtm) window.location.reload(); // stop a tag manager that was already running
  };

  return (
    <div role="dialog" aria-label="Cookies" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-2xl border border-sand bg-surface p-4 shadow-[0_16px_40px_-12px_rgba(15,23,42,.35)] sm:inset-x-6 sm:p-5">
      <p className="text-sm leading-relaxed text-ink/80">
        {t.text}{' '}
        <a href={`/${locale}/privacy`} className="font-medium text-leaf underline underline-offset-2">
          {t.more}
        </a>
      </p>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => decide('denied')} className="flex-1 rounded-xl border border-sand bg-surface px-4 py-2.5 text-sm font-semibold text-ink hover:border-leaf">
          {t.decline}
        </button>
        <button type="button" onClick={() => decide('granted')} className="flex-1 rounded-xl border border-sand bg-surface px-4 py-2.5 text-sm font-semibold text-ink hover:border-leaf">
          {t.accept}
        </button>
      </div>
    </div>
  );
}

export function CookieSettingsLink({ locale, className }: { locale: Locale; className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      {cookieLinkLabel[locale]}
    </button>
  );
}
