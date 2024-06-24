import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import alpinejs from '@astrojs/alpinejs'
import react from '@astrojs/react'
import Icons from 'unplugin-icons/vite'
import cloudflare from '@astrojs/cloudflare'

// https://astro.build/config
export default defineConfig({
  site: 'https://next.tintaborneo.com',
  integrations: [tailwind(), alpinejs(), react()],
  image: {
    domains: [
      'tintaborneo.com',
      'www.tintaborneo.com',
      'staging.tintaborneo.com',
      'content.tintaborneo.com',
      'next.tintaborneo.com'
    ]
  },
  output: 'server',
  adapter: cloudflare(),
  vite: {
    plugins: [
      Icons({
        compiler: 'astro'
      })
    ]
  }
})
