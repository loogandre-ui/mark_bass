import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [tailwindcss()],
  base: '/mark_bass/',   

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sets: resolve(__dirname, 'sets.html'),
        contact: resolve(__dirname, 'contact.html'),
        about: resolve(__dirname, 'about.html'),
      },
    },
  },
})