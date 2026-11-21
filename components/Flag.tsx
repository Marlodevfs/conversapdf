/** Small inline SVG flags (emoji flags don't render on Windows). Decorative. */
export default function Flag({ code, className = 'h-3.5 w-5' }: { code: string; className?: string }) {
  const common = { viewBox: '0 0 30 20', className: `${className} shrink-0 rounded-[2px] ring-1 ring-black/10`, 'aria-hidden': true } as const;
  switch (code) {
    case 'fr':
      return (
        <svg {...common}>
          <rect width="10" height="20" fill="#002654" />
          <rect x="10" width="10" height="20" fill="#fff" />
          <rect x="20" width="10" height="20" fill="#ce1126" />
        </svg>
      );
    case 'it':
      return (
        <svg {...common}>
          <rect width="10" height="20" fill="#009246" />
          <rect x="10" width="10" height="20" fill="#fff" />
          <rect x="20" width="10" height="20" fill="#ce2b37" />
        </svg>
      );
    case 'es':
      return (
        <svg {...common}>
          <rect width="30" height="20" fill="#aa151b" />
          <rect y="5" width="30" height="10" fill="#f1bf00" />
        </svg>
      );
    case 'pt': // Brazilian Portuguese
      return (
        <svg {...common}>
          <rect width="30" height="20" fill="#009c3b" />
          <path d="M15 2.5 27 10 15 17.5 3 10z" fill="#ffdf00" />
          <circle cx="15" cy="10" r="4.6" fill="#002776" />
        </svg>
      );
    case 'en': // British English
      return (
        <svg {...common} viewBox="0 0 60 40">
          <clipPath id="gb-s"><path d="M0 0v40h60V0z" /></clipPath>
          <clipPath id="gb-t"><path d="M30 20h30v20zv20H0zH0V0zV0h30z" /></clipPath>
          <g clipPath="url(#gb-s)">
            <path d="M0 0v40h60V0z" fill="#012169" />
            <path d="M0 0l60 40m0-40L0 40" stroke="#fff" strokeWidth="8" />
            <path d="M0 0l60 40m0-40L0 40" clipPath="url(#gb-t)" stroke="#c8102e" strokeWidth="5" />
            <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="12" />
            <path d="M30 0v40M0 20h60" stroke="#c8102e" strokeWidth="7" />
          </g>
        </svg>
      );
    default:
      return null;
  }
}
