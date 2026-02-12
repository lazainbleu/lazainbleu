import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: undefined,
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist)', 'var(--font-inter)', 'sans-serif'],
      },
      colors: {
        'lb-white': 'var(--lb-white)',
        'lb-bleu': 'var(--lb-bleu)',
        'lb-neutral': 'var(--lb-neutral)',
        'lb-border': 'var(--lb-border)',
      },
    },
  },
  plugins: [],
}

export default config
