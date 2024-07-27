import defaultTheme from 'tailwindcss/defaultTheme'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Source Serif Pro"', ...defaultTheme.fontFamily.serif],
        subheading: ['"Martel Sans"', ...defaultTheme.fontFamily.sans]
      }
    },
    colors: {
      'tb-primary': '#0768DF',
      'tb-secondary': '#E31307',
      'tb-background': '#FBFCFF',
      'tb-text': '#010D17',
      'tb-muted': '#7d7e89'
    }
  },
  plugins: [typography]
}
