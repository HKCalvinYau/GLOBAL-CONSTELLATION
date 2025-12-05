# Keystatic 配置修復指南

## 🔍 問題診斷

訪問 `http://localhost:4321/keystatic` 失敗的常見原因：

1. ❌ 開發伺服器未運行
2. ❌ Keystatic 配置錯誤
3. ❌ 環境變數未設置
4. ❌ 導入路徑錯誤

---

## ✅ 解決方案

### 步驟 1：確認開發伺服器正在運行

```bash
# 檢查是否在運行
npm run dev

# 應該看到類似輸出：
# astro  v4.x.x ready in xxx ms
# Local: http://localhost:4321/
```

### 步驟 2：選擇存儲方式

#### 選項 A：使用本地存儲（推薦用於測試）

修改 `keystatic.config.ts`：

```typescript
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local', // 使用本地文件系統
  },
  collections: {
    posts: collection({
      label: '文章',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({
          label: '標題',
          validation: { length: { min: 1 } },
        }),
        slug: fields.slug({
          name: { label: 'Slug' },
        }),
        publishedDate: fields.date({
          label: '發布日期',
          defaultValue: { kind: 'today' },
        }),
        coverImage: fields.image({
          label: '封面圖片',
          directory: 'public/images/posts',
          publicPath: '/images/posts',
        }),
        excerpt: fields.text({
          label: '摘要',
          multiline: true,
        }),
        content: fields.document({
          label: '內容',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/posts',
            publicPath: '/images/posts',
          },
          tables: true,
        }),
      },
    }),
  },
});
```

**優點**：
- ✅ 無需 GitHub 配置
- ✅ 快速測試
- ✅ 適合本地開發

#### 選項 B：使用 GitHub 存儲（生產環境）

需要設置環境變數：

1. 建立 `.env` 文件：

```bash
KEYSTATIC_GITHUB_TOKEN=your_github_token_here
KEYSTATIC_GITHUB_OWNER=your_github_username
KEYSTATIC_GITHUB_REPO=your_repo_name
```

2. 修改 `keystatic.config.ts`：

```typescript
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: import.meta.env.KEYSTATIC_GITHUB_OWNER || 'YOUR_GITHUB_USERNAME',
      name: import.meta.env.KEYSTATIC_GITHUB_REPO || 'YOUR_REPO_NAME',
    },
  },
  // ... collections 配置
});
```

### 步驟 3：修復 Astro 頁面配置

確保 `src/pages/keystatic/[...params].astro` 正確：

```astro
---
// Keystatic 後台路由
import { makePage } from '@keystatic/astro/ui';
import keystaticConfig from '../../../keystatic.config';

export const prerender = false;

const KeystaticPage = makePage(keystaticConfig);

const result = await KeystaticPage(Astro);
return result;
---
```

### 步驟 4：確認 Astro 配置

檢查 `astro.config.mjs`：

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://your-domain.pages.dev',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    keystatic(), // ✅ 確保已添加
  ],
  output: 'hybrid', // ✅ 必須是 hybrid 模式
  adapter: cloudflare(),
});
```

### 步驟 5：建立必要目錄

```bash
mkdir -p src/content/posts public/images/posts
```

### 步驟 6：重新啟動開發伺服器

```bash
# 停止當前伺服器（Ctrl+C）
# 然後重新啟動
npm run dev
```

---

## 🧪 測試步驟

1. **確認伺服器運行**：
   ```bash
   npm run dev
   ```

2. **訪問首頁**：
   - http://localhost:4321
   - 應該能正常顯示

3. **訪問 Keystatic 後台**：
   - http://localhost:4321/keystatic
   - 應該顯示 Keystatic 登入頁面或管理介面

---

## 🐛 常見錯誤及解決方法

### 錯誤 1：`Cannot find module '@keystatic/astro'`

**解決方案**：
```bash
npm install @keystatic/astro @keystatic/core
```

### 錯誤 2：`process is not defined`

**原因**：在瀏覽器環境中使用了 Node.js 的 `process`

**解決方案**：使用 `import.meta.env` 替代 `process.env`

### 錯誤 3：`Cannot read property 'cwd' of undefined`

**原因**：`process.cwd()` 在瀏覽器環境中不可用

**解決方案**：在配置文件中移除或條件檢查 `process.cwd()`

### 錯誤 4：404 Not Found

**可能原因**：
- 路由未正確配置
- `output: 'hybrid'` 未設置
- `prerender: false` 未設置

**解決方案**：
- 確認 `astro.config.mjs` 中 `output: 'hybrid'`
- 確認 `src/pages/keystatic/[...params].astro` 中 `export const prerender = false`

---

## 📝 快速修復指令

```bash
# 1. 停止開發伺服器（如果正在運行）
# Ctrl+C

# 2. 重新安裝依賴
npm install

# 3. 確認目錄存在
mkdir -p src/content/posts public/images/posts

# 4. 重新啟動
npm run dev
```

---

## 🔗 相關資源

- [Keystatic 官方文檔](https://keystatic.com/docs)
- [Astro + Keystatic 指南](https://docs.astro.build/en/guides/cms/keystatic/)

