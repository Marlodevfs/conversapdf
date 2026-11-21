/** Mark: a white "C" on a blue tile, its lower end drawn as a chat bubble's tail. */
export function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect x="2" y="2" width="60" height="60" rx="16" fill="#2554e8" />
      <path d="M44 21a15 15 0 1 0 0 22" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
      <path d="M22 44l-8 10 12-4z" fill="#fff" />
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
