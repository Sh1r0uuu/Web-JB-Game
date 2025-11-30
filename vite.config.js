import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'; 

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Daftarkan semua aset baru
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png', 'app-logo-192.png', 'app-logo-512.png'], 
      
      manifest: {
        name: 'GGEZ Store - Marketplace',
        short_name: 'GGEZStore',
        description: 'Marketplace Akun Game Online Terpercaya',
        theme_color: '#6C5DD3', 
        background_color: '#0F172A',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
        
        // --- UPDATE IKON PWA DISINI ---
        icons: [
          { src: 'app-logo-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'app-logo-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' }
        ],
        
        // Tambahkan screenshots jika sudah tersedia
        screenshots: [
            { src: 'screenshot-desktop.png', sizes: '1920x1080', type: 'image/png', platform: 'desktop' },
            { src: 'screenshot-mobile.png', sizes: '750x1334', type: 'image/png', platform: 'narrow' }
        ]
      }
    })
  ],
})