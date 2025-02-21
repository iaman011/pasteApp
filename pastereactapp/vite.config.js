import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  root: '.', // Ensure this points to your project root
  build: {
    outDir: 'dist',
  },
  plugins: [
    tailwindcss(),
    // require('@tailwindcss/line-clamp')
   
    react()],
})
