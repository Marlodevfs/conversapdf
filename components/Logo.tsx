/** Mark: a chat bubble that is also a page, with a highlighter-yellow dog-ear. */
export function LogoMark({ className = 'h-8 w-8', inverse = false }: { className?: string; inverse?: boolean }) {
  const body = inverse ? '#ffffff' : '#155741';
  const line = inverse ? '#0c3b2c' : '#ffffff';
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path d="M14 6H44L58 20V42a8 8 0 0 1-8 8H26L12 59l2-9a8 8 0 0 1-8-8V14a8 8 0 0 1 8-8z" fill={body} />
      <path d="M44 6v10a4 4 0 0 0 4 4h10z" fill="#f5e14a" />
      <rect x="14" y="23" width="26" height="4.5" rx="2.25" fill={line} />
      <rect x="14" y="32" width="17" height="4.5" rx="2.25" fill={line} opacity={0.7} />
    </svg>
  );
}

export default function Logo({ className = '', inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-extrabold tracking-[-0.03em] ${className}`}>
      <LogoMark inverse={inverse} />
      <span>ConversaPDF</span>
    </span>
  );
}
