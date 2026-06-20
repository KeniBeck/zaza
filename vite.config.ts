import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: '/zaza/' → nombre del repo. Cambiar a '/' (o quitar) si migra a dominio propio.
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/zaza/' : '/',
  plugins: [react(), tailwindcss()],
}))
