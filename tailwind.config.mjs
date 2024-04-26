import defaultTheme from 'tailwindcss/defaultTheme'

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
  },
  plugins: [],
}
