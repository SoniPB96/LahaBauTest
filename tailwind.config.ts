import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        serif: ['DM Serif Display', 'Georgia', 'serif'],
      },
      colors: {
        bg: {
          DEFAULT: '#09090b',
          2: '#111115',
          3: '#18181d',
          4: '#1e1e24',
        },
        gold: {
          DEFAULT: '#c9aa72',
          light: '#dfc28e',
        },
        text: {
          1: '#ededeb',
          2: '#989894',
          3: '#606060',
          4: '#404040',
        },
        danger: { DEFAULT: '#e05252' },
        success: { DEFAULT: '#4caf82' },
      },
      maxWidth: { site: '1080px' },
      borderRadius: {
        DEFAULT: '8px',
        lg: '14px',
        xl: '20px',
      },
    },
  },
  plugins: [],
}

export default config
