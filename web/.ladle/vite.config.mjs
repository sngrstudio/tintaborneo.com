import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import icons from 'unplugin-icons/vite'

export default defineConfig({
  plugins: [tailwindcss(), icons({ compiler: 'jsx', jsx: 'react' })]
})
