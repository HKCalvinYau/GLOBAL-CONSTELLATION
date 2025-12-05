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
      noExternal: ['@keystatic/core']
    }
  }
});