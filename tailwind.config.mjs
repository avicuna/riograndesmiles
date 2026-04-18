import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Primary blue — oklch(48% 0.14 245) and variants
        primary: {
          50: '#eef6ff',
          100: '#d9ecff',
          200: '#bcdeff',
          300: '#8ec8ff',
          400: '#58a6ff',
          500: '#2b7cc9',   // oklch(48% 0.14 245) ≈ main
          600: '#1d6ab5',
          700: '#165694',   // oklch(36% 0.13 250) ≈ deep
          800: '#174a78',
          900: '#0f3054',
          950: '#0a1f38',
        },
        // Accent teal — oklch(62% 0.13 200)
        accent: {
          50: '#edfcf9',
          100: '#d2f7f0',
          200: '#a9ede3',
          300: '#72ddd0',
          400: '#3ec5b7',
          500: '#2a9d8f',   // oklch(62% 0.13 200) ≈ main
          600: '#1f7f74',
          700: '#1c665e',
          800: '#1b524c',
          900: '#1a4440',
        },
        // Ink (text) — oklch-derived navy
        ink: {
          DEFAULT: '#1a2332', // oklch(22% 0.03 250)
          2: '#3d4b5c',      // oklch(38% 0.03 250)
          3: '#6b7a8d',      // oklch(55% 0.02 245)
        },
        // Gold — oklch(75% 0.13 85)
        gold: '#c9a227',
        // Backgrounds
        bg: {
          DEFAULT: '#f7f8fb', // oklch(98% 0.006 240)
          warm: '#eceef5',    // oklch(95% 0.012 235)
          card: '#fcfcfe',    // oklch(99.5% 0.003 240)
        },
        // Lines / borders
        line: {
          DEFAULT: '#d8dbe3', // oklch(90% 0.012 240)
          2: '#c5c9d4',      // oklch(84% 0.018 240)
        },
      },
      fontFamily: {
        display: ['Newsreader Variable', 'Georgia', 'serif'],
        sans: ['Inter Tight Variable', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '1240px',
      },
      borderRadius: {
        lg: '10px',
      },
    },
  },
  plugins: [typography],
};
