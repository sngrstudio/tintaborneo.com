import { defineConfig } from 'astro/config'
import node from '@astrojs/node'
import tailwind from '@astrojs/tailwind'
import alpinejs from '@astrojs/alpinejs'
import react from '@astrojs/react'
import htmx from 'astro-htmx'
import Icons from 'unplugin-icons/vite'

const UMAMI_ENDPOINT = process.env.UMAMI_ENDPOINT || '/404'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.tintaborneo.com',
  integrations: [tailwind(), htmx(), alpinejs(), react()],
  image: {
    domains: [
      'tintaborneo.com',
      'www.tintaborneo.com',
      'content.tintaborneo.com',
    ],
  },
  redirects: {
    '/__analytics': UMAMI_ENDPOINT,
  },
  output: 'server',
  adapter: node({
    mode: 'middleware',
  }),
  vite: {
    plugins: [
      Icons({
        compiler: 'astro',
      }),
    ],
  },
})
