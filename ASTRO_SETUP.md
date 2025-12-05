# Astro + Keystatic 專案設置指南

## 快速開始

### 1. 初始化 Astro 專案

```bash
# 如果還沒有 Astro 專案，使用以下指令建立
npm create astro@latest

# 選擇以下選項：
# - Template: Empty
# - TypeScript: Yes
# - Install dependencies: Yes
```

或者，如果您已經有專案結構，直接安裝依賴：

```bash
# 將 astro-package.json 的內容複製到 package.json，或直接使用
cp astro-package.json package.json
npm install
```

### 2. 安裝依賴

```bash
npm install
```

### 3. 配置 Keystatic

#### 3.1 更新 `keystatic.config.ts`

編輯 `keystatic.config.ts`，將以下內容替換為您的 GitHub 資訊：

```typescript
storage: {
  kind: 'github',
  repo: {
    owner: 'YOUR_GITHUB_USERNAME', // 替換為您的 GitHub 用戶名
    name: 'YOUR_REPO_NAME',        // 替換為您的倉庫名稱
  },
},
```

#### 3.2 設置 GitHub Personal Access Token

1. 前往 GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
2. 點擊 "Generate new token (classic)"
3. 選擇以下權限：
   - `repo` (完整倉庫權限)
4. 複製生成的 token

#### 3.3 設置環境變數

建立 `.env` 文件（或 `.env.local`）：

```bash
KEYSTATIC_GITHUB_TOKEN=your_github_token_here
```

**重要**：將 `.env` 加入 `.gitignore`，不要提交到版本控制！

### 4. 建立必要的目錄結構

```bash
# 建立內容目錄
mkdir -p src/content/posts

# 建立圖片目錄
mkdir -p public/images/posts

# 建立其他必要的 public 目錄
mkdir -p public
```

### 5. 複製原本的 HTML 內容

將原本 `index.html` 的 `<body>` 內容複製到 `src/pages/index.astro` 中。

### 6. 啟動開發伺服器

```bash
npm run dev
```

訪問：
- 首頁：http://localhost:4321
- 部落格列表：http://localhost:4321/blog
- Keystatic 後台：http://localhost:4321/keystatic

## 專案結構

```
GLOBAL CONSELL/
├── src/
│   ├── layouts/
│   │   └── Layout.astro          # 主要 Layout
│   ├── pages/
│   │   ├── index.astro           # 首頁
│   │   ├── blog/
│   │   │   ├── index.astro       # 部落格列表
│   │   │   └── [slug].astro      # 文章內頁
│   │   └── keystatic/
│   │       └── [...params].astro # Keystatic 後台
│   └── content/
│       └── posts/                # Keystatic 文章內容（自動生成）
├── public/
│   └── images/
│       └── posts/                # 文章圖片
├── astro.config.mjs              # Astro 配置
├── keystatic.config.ts           # Keystatic 配置
├── tailwind.config.mjs           # Tailwind 配置
├── tsconfig.json                  # TypeScript 配置
└── package.json                  # 依賴管理
```

## 使用 Keystatic 後台

### 訪問後台

1. 啟動開發伺服器：`npm run dev`
2. 訪問：http://localhost:4321/keystatic
3. 首次使用需要授權 GitHub 權限

### 建立第一篇文章

1. 在 Keystatic 後台點擊 "Posts" > "Create new entry"
2. 填寫：
   - **Title**: 文章標題
   - **Slug**: 自動生成（可修改）
   - **Published Date**: 發布日期
   - **Cover Image**: 上傳封面圖片（可選）
   - **Excerpt**: 文章摘要
   - **Content**: 文章內容（支援 Markdown）
3. 點擊 "Save" 儲存

### 文章會自動出現在部落格列表

訪問 http://localhost:4321/blog 即可看到所有文章。

## 部署到 Cloudflare Pages

### 1. 準備部署

```bash
# 建置專案
npm run build
```

### 2. 在 Cloudflare Dashboard 設置

1. 前往 Cloudflare Dashboard > Pages
2. 點擊 "Create a project"
3. 連接您的 GitHub 倉庫
4. 設置：
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`（或您的專案根目錄）

### 3. 設置環境變數

在 Cloudflare Pages 設置中添加：
- `KEYSTATIC_GITHUB_TOKEN`: 您的 GitHub Personal Access Token

### 4. 部署

推送代碼到 GitHub，Cloudflare Pages 會自動部署。

## 疑難排解

### 問題：Keystatic 後台無法訪問

**解決方案**：
1. 確認 `.env` 文件中有 `KEYSTATIC_GITHUB_TOKEN`
2. 確認 `keystatic.config.ts` 中的 GitHub 倉庫資訊正確
3. 確認 GitHub token 有正確的權限

### 問題：文章無法顯示

**解決方案**：
1. 確認文章已儲存在 Keystatic 後台
2. 確認 `src/content/posts/` 目錄中有文章檔案
3. 檢查瀏覽器控制台是否有錯誤

### 問題：Tailwind 樣式不生效

**解決方案**：
1. 確認 `tailwind.config.mjs` 中的 `content` 路徑正確
2. 確認 `astro.config.mjs` 中已啟用 `@astrojs/tailwind`
3. 重新啟動開發伺服器

### 問題：建置失敗

**解決方案**：
1. 確認所有依賴已安裝：`npm install`
2. 確認 TypeScript 配置正確
3. 檢查 `astro.config.mjs` 配置

## 下一步

- [ ] 將原本 `index.html` 的內容複製到 `src/pages/index.astro`
- [ ] 在 Keystatic 後台建立第一篇文章
- [ ] 自訂部落格樣式
- [ ] 添加文章分類和標籤功能
- [ ] 優化 SEO 設定






