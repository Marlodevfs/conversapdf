import type { Config } from 'tailwindcss';

/**
 * "Bleu confiance": a bright, airy tool. Token names kept from earlier themes:
 * paper = page background, ink = text, sand = hairlines, leaf = the blue accent,
 * marker = highlighter yellow (the brand's small signature), sheet = the printed PDF.
 */
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        paper: '#f7f9fe',
        surface: { DEFAULT: '#ffffff', raised: '#ffffff' },
        leaf: { DEFAULT: '#2554e8', dark: '#1b3fbf', light: '#e8eeff' },
        sand: '#e2e8f3',
        marker: '#f5e14a',
        sheet: { DEFAULT: '#ffffff', ink: '#1f2a24', line: '#e4ddd0', tint: '#e8f1ec', muted: '#5a605b' },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        doc: ['"Noto Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { display: '-0.035em' },
      keyframes: {
        settle: {
          '0%': { opacity: '0', transform: 'translateY(24px) rotate(0deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) rotate(2deg)' },
        },
        sweep: { '0%': { backgroundSize: '0% 100%' }, '100%': { backgroundSize: '100% 100%' } },
        breathe: {
          '0%, 100%': { opacity: '0.55', transform: 'translate(-50%, -50%) scale(1)' },
          '50%': { opacity: '0.85', transform: 'translate(-50%, -50%) scale(1.06)' },
        },
      },
      animation: {
        settle: 'settle 900ms cubic-bezier(.2,.7,.2,1) 150ms both',
        sweep: 'sweep 600ms ease-out 1100ms both',
        breathe: 'breathe 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
