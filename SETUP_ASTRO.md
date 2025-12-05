# Astro 專案初始化完整指令

## ⚡ 快速開始（3 步驟）

```bash
# 1. 進入專案目錄並使用合併配置
cd "/Users/calvinyau/Documents/Calvin Project/GLOBAL CONSELL"
cp package-merged.json package.json

# 2. 安裝依賴並設置 Tailwind
npm install && npx astro add tailwind --yes

# 3. 啟動開發伺服器
npm run dev
```

完成！訪問 http://localhost:4321 查看網站。

---

## 📋 前置需求

確保您已安裝：
- Node.js 18+ 
- npm 或 yarn

---

## 🚀 完整初始化步驟

### 步驟 1：備份現有 package.json（可選）

```bash
# 進入專案目錄
cd "/Users/calvinyau/Documents/Calvin Project/GLOBAL CONSELL"

# 備份現有的 package.json（如果需要的話）
cp package.json package.json.backup
```

### 步驟 2：合併 package.json 配置

由於專案同時需要 Cloudflare Workers 和 Astro，我們需要合併兩個配置：

```bash
# 方法 1：使用已準備好的合併配置（推薦）
cp package-merged.json package.json

# 方法 2：如果只需要 Astro（不使用 Workers）
cp astro-package.json package.json

# 方法 3：如果只需要 Workers（不使用 Astro）
# 保持現有的 package.json 不變
```

**建議**：使用 `package-merged.json`（已包含所有依賴）

### 步驟 3：安裝所有依賴

```bash
# 安裝所有 npm 套件
npm install
```

### 步驟 4：安裝 Tailwind CSS 整合

```bash
# 使用 Astro 官方工具安裝 Tailwind
npx astro add tailwind

# 當提示時，選擇：
# ✅ Yes - 安裝 @astrojs/tailwind
# ✅ Yes - 更新 astro.config.mjs
```

### 步驟 5：安裝 Keystatic CMS

```bash
# 安裝 Keystatic 核心套件
npm install @keystatic/astro @keystatic/core
```

### 步驟 6：建立必要的目錄結構

```bash
# 建立內容目錄
mkdir -p src/content/posts

# 建立圖片目錄
mkdir -p public/images/posts

# 確保 public 目錄存在
mkdir -p public
```

### 步驟 7：配置 Keystatic（可選，用於 CMS 功能）

```bash
# 建立 .env 文件（如果還沒有）
touch .env
```

然後編輯 `.env` 文件，添加：

```env
KEYSTATIC_GITHUB_TOKEN=your_github_token_here
KEYSTATIC_GITHUB_OWNER=your_github_username
KEYSTATIC_GITHUB_REPO=your_repo_name
```

**注意**：如果暫時不需要 Keystatic CMS 功能，可以跳過此步驟。

### 步驟 8：啟動開發伺服器

```bash
# 啟動 Astro 開發伺服器
npm run dev
```

開發伺服器會在以下地址啟動：
- 🌐 **首頁**：http://localhost:4321
- 📝 **部落格列表**：http://localhost:4321/blog
- 🔧 **Keystatic 後台**：http://localhost:4321/keystatic（需要配置 GitHub）

---

## 📝 完整指令一鍵執行（複製貼上）

### 選項 A：使用合併配置（推薦 - 同時支援 Astro 和 Workers）

```bash
# 進入專案目錄
cd "/Users/calvinyau/Documents/Calvin Project/GLOBAL CONSELL"

# 使用合併後的 package.json（包含 Astro + Workers）
cp package-merged.json package.json

# 安裝所有依賴
npm install

# 安裝 Tailwind CSS（如果尚未整合）
npx astro add tailwind --yes

# 建立目錄結構
mkdir -p src/content/posts public/images/posts public

# 啟動 Astro 開發伺服器
npm run dev
```

### 選項 B：僅使用 Astro（不使用 Workers）

```bash
# 進入專案目錄
cd "/Users/calvinyau/Documents/Calvin Project/GLOBAL CONSELL"

# 使用 Astro 專用的 package.json
cp astro-package.json package.json

# 安裝所有依賴
npm install

# 安裝 Tailwind CSS
npx astro add tailwind --yes

# 建立目錄結構
mkdir -p src/content/posts public/images/posts public

# 啟動開發伺服器
npm run dev
```

---

## 🔧 常用開發指令

### 開發模式
```bash
npm run dev          # 啟動開發伺服器（熱重載）
```

### 建置專案
```bash
npm run build        # 建置生產版本
npm run preview      # 預覽建置結果
```

### Astro CLI
```bash
npm run astro        # 執行 Astro CLI
npx astro --help     # 查看 Astro 幫助
```

---

## ⚠️ 疑難排解

### 問題 1：`Cannot find module 'astro'`

**解決方案**：
```bash
npm install
```

### 問題 2：`Cannot find module '@astrojs/tailwind'`

**解決方案**：
```bash
npx astro add tailwind
```

### 問題 3：`Cannot find module '@keystatic/astro'`

**解決方案**：
```bash
npm install @keystatic/astro @keystatic/core
```

### 問題 4：端口 4321 已被占用

**解決方案**：
```bash
# Astro 會自動使用下一個可用端口（4322, 4323...）
# 或手動指定端口：
npm run dev -- --port 3000
```

### 問題 5：Keystatic 後台無法訪問

**解決方案**：
1. 確認 `.env` 文件存在
2. 確認 GitHub token 正確
3. 確認 `keystatic.config.ts` 中的倉庫資訊正確

---

## 📦 依賴套件清單

安裝完成後，您的 `package.json` 應包含：

**核心依賴**：
- `astro` - Astro 框架
- `@astrojs/tailwind` - Tailwind CSS 整合
- `@astrojs/cloudflare` - Cloudflare 適配器
- `@keystatic/astro` - Keystatic CMS 整合
- `@keystatic/core` - Keystatic 核心
- `tailwindcss` - Tailwind CSS

**開發依賴**：
- `typescript` - TypeScript 支援
- `@types/node` - Node.js 類型定義

---

## ✅ 驗證安裝

執行以下指令確認安裝成功：

```bash
# 檢查 Astro 版本
npx astro --version

# 檢查已安裝的套件
npm list --depth=0

# 檢查 Tailwind 配置
cat tailwind.config.mjs

# 檢查 Astro 配置
cat astro.config.mjs
```

---

## 🎯 下一步

1. ✅ 確認開發伺服器正常啟動
2. 📝 將 `index.html` 內容複製到 `src/pages/index.astro`
3. 🎨 測試頁面顯示是否正常
4. 📚 開始使用 Keystatic 建立文章（可選）

---

## 📚 相關文檔

- [Astro 官方文檔](https://docs.astro.build)
- [Tailwind CSS 文檔](https://tailwindcss.com/docs)
- [Keystatic 文檔](https://keystatic.com/docs)

