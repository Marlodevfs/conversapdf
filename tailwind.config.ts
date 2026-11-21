import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14201a',
        paper: '#f0f3ee',
        leaf: { DEFAULT: '#155741', dark: '#0c3b2c', light: '#dcebe3' },
        sand: '#d2dbd3',
        marker: '#f5e14a',
      },
      fontFamily: {
        sans: ['"Schibsted Grotesk Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        doc: ['"Noto Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { display: '-0.035em' },
      keyframes: {
        settle: {
          '0%': { opacity: '0', transform: 'translateY(24px) rotate(0deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) rotate(2deg)' },
        },
        sweep: { '0%': { backgroundSize: '0% 100%' }, '100%': { backgroundSize: '100% 100%' } },
      },
      animation: {
        settle: 'settle 700ms cubic-bezier(.2,.7,.2,1) 150ms both',
        sweep: 'sweep 600ms ease-out 950ms both',
      },
    },
  },
  plugins: [],
} satisfies Config;
