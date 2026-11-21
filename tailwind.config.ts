import type { Config } from 'tailwindcss';

/**
 * "Night archive": a dark, quiet room where the only light is the document.
 * Token names are kept from the first theme so components stay readable:
 * paper = the room, ink = text, sand = hairlines, leaf = the warm light (accent).
 */
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#f2ece2',
        paper: '#09090b',
        surface: { DEFAULT: '#121215', raised: '#1a1a1f' },
        leaf: { DEFAULT: '#ede5d6', dark: '#c9bfae', light: '#1c1c21' },
        sand: '#26262c',
        marker: '#f5e14a',
        sheet: { DEFAULT: '#fbf8f2', ink: '#1f2a24', line: '#e4ddd0', tint: '#e8f1ec', muted: '#5a605b' },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        doc: ['"Noto Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { display: '-0.015em' },
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
