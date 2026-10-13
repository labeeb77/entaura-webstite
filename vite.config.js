import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // styles.css is shipped exactly as authored; minifiers may rewrite values.
    cssMinify: false,
  },
})
