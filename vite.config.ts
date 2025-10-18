import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import mpa from 'vite-plugin-mpa';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src'),
    }
  },
  plugins: [react(), mpa()],
  server: {
    port: 5173,
    open: true,

  }
})
