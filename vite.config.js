import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      includeAssets: [
        'favicon.svg',
        'favicon.ico',
        'robots.txt',
        'pwa-logo.jpeg',
      ],
      manifest: {
        name: 'Semar Calculator',
        short_name: 'SemarCalc',
        description: 'Kalkulator harga emas Semar otomatis',
        theme_color: '#4f46e5',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/pwa-logo.jpeg',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-logo.jpeg',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-logo.jpeg',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
});
