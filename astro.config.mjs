import { defineConfig } from 'astro/config'
import node from '@astrojs/node'
import tailwind from '@astrojs/tailwind'
import alpinejs from '@astrojs/alpinejs'
import react from '@astrojs/react'
import htmx from 'astro-htmx'
import Icons from 'unplugin-icons/vite'
import 'dotenv/config'

// https://astro.build/config
export default defineConfig({
  site: process.env.STAGING
    ? 'https://staging.tintaborneo.com'
    : 'https://www.tintaborneo.com',
  integrations: [tailwind(), htmx(), alpinejs(), react()],
  image: {
    domains: [
      'tintaborneo.com',
      'www.tintaborneo.com',
      'staging.tintaborneo.com',
      'content.tintaborneo.com'
    ]
  },
  output: 'server',
  adapter: node({
    mode: 'middleware'
  }),
  vite: {
    plugins: [
      Icons({
        compiler: 'astro'
      })
    ]
  }
})
