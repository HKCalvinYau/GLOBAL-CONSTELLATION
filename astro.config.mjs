import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import keystatic from '@keystatic/astro';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://your-domain.pages.dev', // 請替換為您的 Cloudflare Pages 域名
  integrations: [
    tailwind({
      // 啟用 Tailwind CSS
      applyBaseStyles: true, // 啟用基礎樣式
    }), 
    keystatic(), 
    react()
  ],
  output: 'hybrid', // 使用 hybrid mode：靜態頁面 + 動態路由（Keystatic）
  adapter: cloudflare(), // Cloudflare Pages 適配器
  vite: {
    ssr: {
      // 完全排除 @keystatic/core 的 reader，因為它使用 Node.js 內建模組
      // 我們使用動態導入和 @vite-ignore 來避免構建時解析
      external: [
        '@keystatic/core/reader',
        '@keystatic/core/dist/keystatic-core-reader.worker.js'
      ],
      noExternal: ['@keystatic/astro']
    },
    optimizeDeps: {
      exclude: [
        '@keystatic/core/reader',
        '@keystatic/core/dist/keystatic-core-reader.worker.js'
      ]
    },
    resolve: {
      // 避免解析 Node.js 內建模組
      alias: {
        'node:path': false,
        'node:fs': false,
        'node:url': false
      }
    }
  }
});