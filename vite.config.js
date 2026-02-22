import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set the base path to the repository name for GitHub Pages to resolve assets correctly
  base: '/saurabh_ai_brutalist/'
})
