import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';

// 暫時移除 Keystatic 集成，因為它在構建時會嘗試打包 Node.js 內建模組
// 我們將在運行時通過動態導入來使用 Keystatic
// const keystatic = await import('@keystatic/astro');

// https://astro.build/config
export default defineConfig({
  site: 'https://your-domain.pages.dev', // 請替換為您的 Cloudflare Pages 域名
  integrations: [
    tailwind({
      // 啟用 Tailwind CSS
      applyBaseStyles: true, // 啟用基礎樣式
    }), 
    // keystatic(), // 暫時移除，避免構建時打包 Node.js 內建模組
    react()
  ],
  output: 'hybrid', // 使用 hybrid mode：靜態頁面 + 動態路由
  adapter: cloudflare(), // Cloudflare Pages 適配器
  vite: {
    ssr: {
      // 完全排除所有 @keystatic 相關模組，避免構建時打包
      external: [
        '@keystatic/core/reader',
        '@keystatic/core/dist/keystatic-core-reader.worker.js',
        '@keystatic/core',
        '@keystatic/astro'
      ],
      noExternal: []
    },
    optimizeDeps: {
      exclude: [
        '@keystatic/core/reader',
        '@keystatic/core/dist/keystatic-core-reader.worker.js',
        '@keystatic/core',
        '@keystatic/astro'
      ]
    },
    resolve: {
      // 避免解析 Node.js 內建模組
      alias: {
        'node:path': false,
        'node:fs': false,
        'node:url': false,
        'node:util': false,
        'node:os': false
      }
    }
  }
});