import defaultTheme from 'tailwindcss/defaultTheme'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Source Serif Pro"', ...defaultTheme.fontFamily.serif],
        subheading: ['"Martel Sans"', ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      'tb-primary': '#C90028',
      'tb-secondary': '#00815e',
      'tb-background': '#FCFAFA',
      'tb-text': '#262224',
      'tb-muted': '#70696B',
    },
  },
  plugins: [typography],
}
