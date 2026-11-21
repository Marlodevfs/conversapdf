/** Mark: an open ring that reads as a "C" (Conversa) and as a chat bubble, on a blue tile. */
export function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect x="2" y="2" width="60" height="60" rx="16" fill="#2554e8" />
      <path d="M44.5 22.5A14 14 0 1 0 44.5 39.5" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
      <path d="M19.5 40l-6 11 13-6.5z" fill="#fff" />
      <circle cx="47" cy="31" r="3.4" fill="#fff" />
    </svg>
  );
}

export default function Logo({ className = '' }: { className?: string; inverse?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-extrabold tracking-[-0.02em] text-ink ${className}`}>
      <LogoMark />
      <span>ConversaPDF</span>
    </span>
  );
}
