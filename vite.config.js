import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // On GitHub Pages, assets must be served from "/<repo-name>/"
  base: process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
    : '/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:3001',
    },
  },
})
