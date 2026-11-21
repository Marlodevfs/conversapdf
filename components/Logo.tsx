/**
 * Mark: the outline of a chat bubble that is also a sheet of paper, with a
 * highlighter-yellow dog-ear. Drawn in line, like a light in a dark room.
 */
export function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden fill="none">
      <path
        d="M15 8h27l14 14v19a8 8 0 0 1-8 8H27l-12 9 2-9h-2a8 8 0 0 1-8-8V16a8 8 0 0 1 8-8z"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <path d="M42 8v8a6 6 0 0 0 6 6h8z" fill="#f5e14a" />
      <path d="M18 26h20M18 34h13" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" opacity=".55" />
    </svg>
  );
}

export default function Logo({ className = '' }: { className?: string; inverse?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-ink ${className}`}>
      <LogoMark />
      <span className="flex items-baseline gap-1.5">
        <span className="font-display text-[1.35em] leading-none tracking-[-0.01em]">Conversa</span>
        <span className="font-mono text-[0.62em] font-medium tracking-[0.22em] text-ink/70">PDF</span>
      </span>
    </span>
  );
}
