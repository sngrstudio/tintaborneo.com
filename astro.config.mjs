import { defineConfig } from 'astro/config'
import node from '@astrojs/node'
import tailwind from '@astrojs/tailwind'
import alpinejs from '@astrojs/alpinejs'
import react from '@astrojs/react'
import htmx from 'astro-htmx'
import Icons from 'unplugin-icons/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://new.tintaborneo.com',
  integrations: [tailwind(), htmx(), alpinejs(), react()],
  image: {
    domains: [
      'tintaborneo.com',
      'www.tintaborneo.com',
      'new.tintaborneo.com',
      'src.tintaborneo.com',
      'content.tintaborneo.com',
    ],
  },
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  vite: {
    plugins: [
      Icons({
        compiler: 'astro',
      }),
    ],
  },
})
