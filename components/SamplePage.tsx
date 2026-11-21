import type { Locale } from '@/config/site';

/**
 * A miniature of a real ConversaPDF page, shown in the hero: it says what the
 * tool makes faster than any sentence. Decorative, hidden from screen readers.
 */
type Msg = { who: string; text: string; time: string; me?: boolean; mark?: boolean; photo?: boolean };
type Sample = { file: string; day: string; msgs: Msg[]; page: string };

const samples: Record<Locale, Sample> = {
  es: {
    file: 'Chat de WhatsApp con Javier (casero)',
    day: 'martes, 3 de septiembre de 2026',
    msgs: [
      { who: 'Javier', text: 'Hola, ya revisé el piso. Todo está perfecto.', time: '18:02' },
      { who: 'Javier', text: 'Las llaves, en el buzón.', time: '18:03', photo: true },
      { who: 'Yo', text: 'Genial, ¿y la fianza?', time: '18:05', me: true },
      { who: 'Javier', text: 'Te devuelvo los 900 € el viernes sin falta.', time: '18:07', mark: true },
      { who: 'Yo', text: 'Perfecto, gracias 🙏', time: '18:08', me: true },
    ],
    page: 'Página 4 de 12',
  },
  pt: {
    file: 'Conversa do WhatsApp com Rafael (locador)',
    day: 'terça-feira, 3 de setembro de 2026',
    msgs: [
      { who: 'Rafael', text: 'Oi, vistoriei o apartamento. Está tudo certo.', time: '18:02' },
      { who: 'Rafael', text: 'As chaves estão na caixa de correio.', time: '18:03', photo: true },
      { who: 'Eu', text: 'Ótimo, e a caução?', time: '18:05', me: true },
      { who: 'Rafael', text: 'Devolvo os R$ 2.500 na sexta sem falta.', time: '18:07', mark: true },
      { who: 'Eu', text: 'Combinado, obrigado 🙏', time: '18:08', me: true },
    ],
    page: 'Página 4 de 12',
  },
  it: {
    file: 'Chat WhatsApp con Marco (proprietario)',
    day: 'martedì 3 settembre 2026',
    msgs: [
      { who: 'Marco', text: 'Ciao, ho controllato l’appartamento. Tutto a posto.', time: '18:02' },
      { who: 'Marco', text: 'Le chiavi sono nella cassetta.', time: '18:03', photo: true },
      { who: 'Io', text: 'Perfetto, e la cauzione?', time: '18:05', me: true },
      { who: 'Marco', text: 'Ti ridò i 900 € venerdì senza falla.', time: '18:07', mark: true },
      { who: 'Io', text: 'Ok, grazie 🙏', time: '18:08', me: true },
    ],
    page: 'Pagina 4 di 12',
  },
  fr: {
    file: 'Discussion WhatsApp avec Julien (propriétaire)',
    day: 'mardi 3 septembre 2026',
    msgs: [
      { who: 'Julien', text: 'Bonjour, j’ai fait l’état des lieux. Tout est parfait.', time: '18:02' },
      { who: 'Julien', text: 'Les clés sont dans la boîte aux lettres.', time: '18:03', photo: true },
      { who: 'Moi', text: 'Super, et pour la caution ?', time: '18:05', me: true },
      { who: 'Julien', text: 'Je vous rends les 900 € vendredi sans faute.', time: '18:07', mark: true },
      { who: 'Moi', text: 'Parfait, merci 🙏', time: '18:08', me: true },
    ],
    page: 'Page 4 sur 12',
  },
  en: {
    file: 'WhatsApp Chat with Daniel (landlord)',
    day: 'Tuesday, 3 September 2026',
    msgs: [
      { who: 'Daniel', text: 'Hi, I’ve checked the flat. Everything’s fine.', time: '18:02' },
      { who: 'Daniel', text: 'Keys are in the letterbox.', time: '18:03', photo: true },
      { who: 'Me', text: 'Great, and the deposit?', time: '18:05', me: true },
      { who: 'Daniel', text: 'I’ll send the £900 back on Friday, no problem.', time: '18:07', mark: true },
      { who: 'Me', text: 'Perfect, thanks 🙏', time: '18:08', me: true },
    ],
    page: 'Page 4 of 12',
  },
};

export default function SamplePage({ locale }: { locale: Locale }) {
  const s = samples[locale];
  return (
    <div aria-hidden className="relative mx-auto w-full max-w-[380px] select-none">
      {/* sheet underneath, so it reads as a stack of printed pages */}
      <div className="absolute inset-0 translate-x-3 translate-y-3 -rotate-1 rounded-[6px] bg-white/70 shadow-[0_1px_0_rgba(20,32,26,.06),0_20px_40px_-24px_rgba(20,32,26,.35)]" />
      <div className="relative flex aspect-[210/297] rotate-[2deg] animate-settle flex-col rounded-[6px] bg-white px-6 pb-4 pt-5 font-doc text-[11px] leading-snug text-ink shadow-[0_1px_0_rgba(20,32,26,.06),0_30px_60px_-28px_rgba(20,32,26,.45)]">
        <div className="flex items-center justify-between border-b border-sand pb-2 text-[9px] text-ink/70">
          <span className="truncate pr-3">{s.file}</span>
          <span className="font-bold text-ink/70">ConversaPDF</span>
        </div>
        <div className="my-3 self-center rounded-full bg-paper px-3 py-0.5 text-[9px] text-ink/70">{s.day}</div>
        <div className="flex flex-1 flex-col gap-2">
          {s.msgs.map((m) => (
            <div key={m.time} className={`max-w-[78%] rounded-[10px] px-3 py-2 ${m.me ? 'self-end bg-leaf-light' : 'self-start border border-sand bg-white'}`}>
              {!m.me && <div className="mb-0.5 text-[9px] font-bold text-leaf">{m.who}</div>}
              {m.photo && (
                <svg viewBox="0 0 140 84" className="mb-1.5 block w-[140px] rounded-[6px]">
                  <rect width="140" height="84" fill="#dcebe3" />
                  <rect x="0" y="58" width="140" height="26" fill="#c9d8cf" />
                  <rect x="54" y="14" width="34" height="50" rx="2" fill="#f0f3ee" stroke="#b7c7bd" />
                  <circle cx="81" cy="40" r="2" fill="#155741" />
                  <rect x="18" y="20" width="22" height="18" rx="1.5" fill="#fff" opacity=".8" />
                  <rect x="100" y="22" width="24" height="30" rx="1.5" fill="#fff" opacity=".6" />
                </svg>
              )}
              <span className={m.mark ? 'marker animate-sweep' : undefined}>{m.text}</span>
              <div className="mt-0.5 text-right text-[8px] text-ink/70">{m.time}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-sand pt-2 text-[9px] text-ink/70">
          <span>SHA-256 7f3a…c91e</span>
          <span>{s.page}</span>
        </div>
      </div>
    </div>
  );
}
