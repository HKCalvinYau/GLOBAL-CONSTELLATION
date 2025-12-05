# 完整安裝指令

## 步驟 1：初始化 Astro 專案

```bash
# 在專案根目錄執行
npm create astro@latest .

# 選擇以下選項：
# - Template: Empty
# - TypeScript: Yes
# - Install dependencies: Yes
# - Initialize git: Yes (可選)
```

或者，如果您想手動設置：

```bash
# 複製 astro-package.json 到 package.json
cp astro-package.json package.json

# 安裝依賴
npm install
```

## 步驟 2：安裝 Tailwind CSS 和 Keystatic

```bash
# 安裝 Astro Tailwind 整合
npx astro add tailwind

# 安裝 Keystatic
npm install @keystatic/astro @keystatic/core
```

## 步驟 3：配置 Keystatic

### 3.1 更新 keystatic.config.ts

編輯 `keystatic.config.ts`，將以下內容替換：

```typescript
repo: {
  owner: 'YOUR_GITHUB_USERNAME',  // 替換為您的 GitHub 用戶名
  name: 'YOUR_REPO_NAME',         // 替換為您的倉庫名稱
},
```

### 3.2 建立 GitHub Personal Access Token

1. 前往：https://github.com/settings/tokens
2. 點擊 "Generate new token (classic)"
3. 選擇權限：
   - ✅ `repo` (完整倉庫權限)
4. 複製生成的 token

### 3.3 設置環境變數

建立 `.env` 文件：

```bash
KEYSTATIC_GITHUB_TOKEN=your_token_here
KEYSTATIC_GITHUB_OWNER=your_github_username
KEYSTATIC_GITHUB_REPO=your_repo_name
```

**重要**：`.env` 已在 `.gitignore` 中，不會被提交。

## 步驟 4：建立目錄結構

```bash
# 建立內容目錄
mkdir -p src/content/posts

# 建立圖片目錄
mkdir -p public/images/posts

# 建立其他必要的目錄
mkdir -p public
```

## 步驟 5：複製原本的 HTML 內容

將原本 `index.html` 的 `<body>` 內容（從 `<nav>` 到 `</script>`）複製到 `src/pages/index.astro` 中，替換預留的位置。

## 步驟 6：啟動開發伺服器

```bash
npm run dev
```

訪問：
- 首頁：http://localhost:4321
- 部落格列表：http://localhost:4321/blog
- Keystatic 後台：http://localhost:4321/keystatic

## 步驟 7：首次使用 Keystatic

1. 訪問 http://localhost:4321/keystatic
2. 點擊 "Sign in with GitHub"
3. 授權應用程式存取您的 GitHub 倉庫
4. 開始建立文章！

## 建置和部署

### 本地建置

```bash
npm run build
```

### 預覽建置結果

```bash
npm run preview
```

### 部署到 Cloudflare Pages

1. 將代碼推送到 GitHub
2. 在 Cloudflare Dashboard > Pages 中連接倉庫
3. 設置：
   - Framework preset: Astro
   - Build command: `npm run build`
   - Build output directory: `dist`
4. 添加環境變數：
   - `KEYSTATIC_GITHUB_TOKEN`
   - `KEYSTATIC_GITHUB_OWNER`
   - `KEYSTATIC_GITHUB_REPO`
5. 部署！

## 完整指令列表

```bash
# 初始化專案
npm create astro@latest .

# 安裝依賴
npm install

# 安裝 Tailwind
npx astro add tailwind

# 安裝 Keystatic
npm install @keystatic/astro @keystatic/core

# 建立目錄
mkdir -p src/content/posts public/images/posts

# 啟動開發伺服器
npm run dev

# 建置專案
npm run build

# 預覽建置結果
npm run preview
```

## 疑難排解

### 問題：`Cannot find module '@keystatic/astro'`

**解決方案**：
```bash
npm install @keystatic/astro @keystatic/core
```

### 問題：Keystatic 後台無法訪問

**解決方案**：
1. 確認 `.env` 文件存在且包含正確的 token
2. 確認 `keystatic.config.ts` 中的倉庫資訊正確
3. 確認 GitHub token 有正確的權限

### 問題：文章無法顯示

**解決方案**：
1. 確認在 Keystatic 後台已建立文章
2. 確認文章已儲存
3. 重新啟動開發伺服器






