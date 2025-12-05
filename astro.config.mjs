import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';

// 條件導入 Keystatic：只在非構建環境或本地開發時使用
let keystaticIntegration = null;
if (process.env.NODE_ENV !== 'production' || process.env.CF_PAGES === '1') {
  // 在 Cloudflare Pages 構建時，完全跳過 Keystatic 集成
  // 我們將在運行時動態加載內容
  try {
    const keystatic = await import('@keystatic/astro');
    keystaticIntegration = keystatic.default();
  } catch (e) {
    console.warn('無法載入 Keystatic 集成（構建時跳過）:', e);
  }
}

// https://astro.build/config
export default defineConfig({
  site: 'https://your-domain.pages.dev', // 請替換為您的 Cloudflare Pages 域名
  integrations: [
    tailwind({
      // 啟用 Tailwind CSS
      applyBaseStyles: true, // 啟用基礎樣式
    }), 
    ...(keystaticIntegration ? [keystaticIntegration] : []), // 條件添加 Keystatic
    react()
  ],
  output: 'hybrid', // 使用 hybrid mode：靜態頁面 + 動態路由（Keystatic）
  adapter: cloudflare(), // Cloudflare Pages 適配器
  vite: {
    ssr: {
      // 完全排除所有 @keystatic/core 相關模組
      external: [
        '@keystatic/core/reader',
        '@keystatic/core/dist/keystatic-core-reader.worker.js',
        '@keystatic/core'
      ],
      noExternal: []
    },
    optimizeDeps: {
      exclude: [
        '@keystatic/core/reader',
        '@keystatic/core/dist/keystatic-core-reader.worker.js',
        '@keystatic/core'
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