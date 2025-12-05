# Cloudflare Pages 部署指南

## 當前狀態

項目已配置為使用 Cloudflare Pages，但由於 Keystatic 的 `createReader` 在構建時需要使用 Node.js 內建模組，在 Cloudflare Workers 環境中可能無法正常工作。

## 解決方案

### 方案 1：使用 GitHub 存儲（推薦）

1. **設置 GitHub 存儲**：
   - 在 Cloudflare Pages 設置中添加環境變數：
     - `KEYSTATIC_GITHUB_OWNER`: 您的 GitHub 用戶名
     - `KEYSTATIC_GITHUB_REPO`: 您的倉庫名稱
     - `KEYSTATIC_GITHUB_TOKEN`: GitHub Personal Access Token（需要 `repo` 權限）

2. **更新 `keystatic.config.ts`**：
   已經配置為自動檢測環境變數，如果設置了 GitHub 環境變數，會自動使用 GitHub 存儲。

### 方案 2：使用 Cloudflare Pages 構建

1. **將代碼推送到 GitHub**
2. **在 Cloudflare Dashboard 中創建 Pages 項目**：
   - 前往 Cloudflare Dashboard > Workers & Pages > Pages
   - 點擊 "Create a project" > "Connect to Git"
   - 選擇您的 GitHub 倉庫
3. **配置構建設置**：
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`（或您的專案根目錄）
4. **添加環境變數**（如果使用 GitHub 存儲）：
   - `KEYSTATIC_GITHUB_OWNER`
   - `KEYSTATIC_GITHUB_REPO`
   - `KEYSTATIC_GITHUB_TOKEN`
5. **部署**

### 方案 3：使用 Wrangler CLI 部署

```bash
# 1. 登入 Cloudflare
npx wrangler login

# 2. 構建項目
npm run build

# 3. 部署到 Cloudflare Pages
npx wrangler pages deploy dist --project-name=amar-constellation
```

## 注意事項

1. **Keystatic 後台**：需要設置 GitHub 存儲才能在 Cloudflare Pages 上正常工作
2. **本地存儲**：僅適用於開發環境，不適用於生產環境
3. **環境變數**：確保在 Cloudflare Pages 設置中正確配置所有必要的環境變數

## 當前構建錯誤

構建時出現以下錯誤：
```
Cannot bundle Node.js built-in "node:path" imported from "@keystatic/core"
```

這是因為 `createReader` 使用了 Node.js 內建模組，在 Cloudflare Workers 環境中不可用。

**臨時解決方案**：使用 GitHub 存儲，這樣 reader 可以在構建時正常工作。

## 下一步

1. 設置 GitHub 存儲
2. 在 Cloudflare Pages 中添加環境變數
3. 重新構建和部署

