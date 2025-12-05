# Astro + Keystatic 專案總結

## 📁 已建立的檔案結構

```
GLOBAL CONSELL/
├── src/
│   ├── layouts/
│   │   └── Layout.astro              # 主要 Layout（包含 head 設定）
│   ├── pages/
│   │   ├── index.astro                # 首頁（預留位置，待複製原 HTML 內容）
│   │   ├── blog/
│   │   │   ├── index.astro            # 部落格列表頁
│   │   │   └── [slug].astro           # 文章內頁（動態路由）
│   │   └── keystatic/
│   │       └── [...params].astro      # Keystatic 後台路由
│   └── env.d.ts                       # TypeScript 環境定義
├── public/
│   └── images/
│       └── posts/                     # 文章圖片目錄（需手動建立）
├── astro.config.mjs                   # Astro 配置
├── keystatic.config.ts                # Keystatic CMS 配置
├── tailwind.config.mjs                # Tailwind CSS 配置
├── tsconfig.json                      # TypeScript 配置
├── astro-package.json                 # 依賴清單（需複製到 package.json）
├── ASTRO_SETUP.md                     # 詳細設置指南
├── INSTALL.md                         # 完整安裝指令
└── ASTRO_SUMMARY.md                   # 本文件
```

## 🚀 快速開始

### 1. 安裝依賴

```bash
# 複製 package.json
cp astro-package.json package.json

# 安裝所有依賴
npm install

# 安裝 Tailwind 整合
npx astro add tailwind
```

### 2. 配置 Keystatic

編輯 `keystatic.config.ts`，更新 GitHub 倉庫資訊：

```typescript
repo: {
  owner: 'YOUR_GITHUB_USERNAME',  // 替換這裡
  name: 'YOUR_REPO_NAME',        // 替換這裡
},
```

### 3. 設置環境變數

建立 `.env` 文件：

```bash
KEYSTATIC_GITHUB_TOKEN=your_token_here
KEYSTATIC_GITHUB_OWNER=your_github_username
KEYSTATIC_GITHUB_REPO=your_repo_name
```

### 4. 建立目錄

```bash
mkdir -p src/content/posts public/images/posts
```

### 5. 複製原 HTML 內容

將 `index.html` 的 `<body>` 內容複製到 `src/pages/index.astro`

### 6. 啟動開發伺服器

```bash
npm run dev
```

訪問：
- 首頁：http://localhost:4321
- 部落格：http://localhost:4321/blog
- Keystatic 後台：http://localhost:4321/keystatic

## 📝 重要配置檔案說明

### astro.config.mjs

- 整合 Tailwind CSS
- 整合 Keystatic
- 配置 Cloudflare Pages 適配器
- 使用 hybrid mode（靜態 + 動態路由）

### keystatic.config.ts

- 定義 `posts` collection
- 欄位包含：title, slug, publishedDate, coverImage, excerpt, content
- 配置 GitHub 儲存

### tailwind.config.mjs

- 配置 Tailwind 掃描路徑
- 可擴展主題設定

## 🎨 頁面說明

### src/pages/index.astro

- 首頁
- 預留位置，待複製原 `index.html` 的 body 內容
- 已包含導航欄範例

### src/pages/blog/index.astro

- 部落格列表頁
- 自動從 Keystatic 讀取所有文章
- 按發布日期排序（最新的在前）
- 顯示標題、摘要、日期、封面圖片

### src/pages/blog/[slug].astro

- 文章內頁（動態路由）
- 從 Keystatic 讀取單篇文章
- 渲染文章內容（支援 Markdown）
- 包含 SEO meta tags

### src/pages/keystatic/[...params].astro

- Keystatic 後台路由
- 提供 CMS 管理介面
- 需要 GitHub 授權

## 🔧 下一步操作

1. **複製原 HTML 內容**
   - 打開 `index.html`
   - 複製 `<body>` 內的所有內容
   - 貼到 `src/pages/index.astro` 的預留位置

2. **設置 GitHub**
   - 建立 GitHub Personal Access Token
   - 更新 `keystatic.config.ts` 中的倉庫資訊
   - 設置 `.env` 環境變數

3. **建立第一篇文章**
   - 訪問 http://localhost:4321/keystatic
   - 授權 GitHub 權限
   - 建立第一篇文章

4. **自訂樣式**
   - 調整 `tailwind.config.mjs`
   - 修改各頁面的樣式

5. **部署**
   - 推送到 GitHub
   - 在 Cloudflare Pages 連接倉庫
   - 設置環境變數
   - 部署！

## 📚 相關文檔

- **ASTRO_SETUP.md** - 詳細設置指南
- **INSTALL.md** - 完整安裝指令
- **README.md** - 原專案說明

## ⚠️ 注意事項

1. **環境變數**：`.env` 文件不要提交到 Git
2. **GitHub Token**：確保 token 有正確的權限
3. **目錄結構**：確保 `public/images/posts` 目錄存在
4. **Keystatic 後台**：首次使用需要 GitHub 授權

## 🐛 常見問題

### Keystatic 後台無法訪問

- 確認 `.env` 文件存在
- 確認 GitHub token 正確
- 確認倉庫資訊正確

### 文章無法顯示

- 確認文章已在 Keystatic 後台建立
- 確認文章已儲存
- 重新啟動開發伺服器

### Tailwind 樣式不生效

- 確認 `tailwind.config.mjs` 中的 content 路徑正確
- 確認已安裝 `@astrojs/tailwind`
- 重新啟動開發伺服器



