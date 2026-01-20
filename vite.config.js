

// https://vite.dev/config/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // أي طلب يبدأ بـ /api هيتحول للـ API الحقيقي على HTTP
      '/api': {
        target: 'https://authtest.skysoft-erb.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
