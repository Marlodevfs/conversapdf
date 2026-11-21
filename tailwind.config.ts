import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1f2a24',
        paper: '#fbf8f2',
        leaf: { DEFAULT: '#1d6b4f', dark: '#14513b', light: '#e3f0ea' },
        sand: '#efe7d8',
      },
      fontFamily: { sans: ['var(--font-sans)', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
} satisfies Config;
