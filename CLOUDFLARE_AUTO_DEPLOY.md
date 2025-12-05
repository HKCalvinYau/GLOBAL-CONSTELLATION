# Cloudflare Pages 自動部署設置指南

## 為什麼上傳到 GitHub 後 Cloudflare 不更新？

Cloudflare Pages **不會自動**監聽 GitHub 推送，除非您已經在 Cloudflare Dashboard 中設置了 Git 連接。以下是完整的設置步驟：

## 📋 設置步驟

### 步驟 1：在 Cloudflare Dashboard 中創建 Pages 項目

1. **登入 Cloudflare Dashboard**
   - 前往：https://dash.cloudflare.com/
   - 登入您的帳戶

2. **創建 Pages 項目**
   - 點擊左側菜單的 **"Workers & Pages"**
   - 點擊 **"Pages"** 標籤
   - 點擊 **"Create a project"** 按鈕
   - 選擇 **"Connect to Git"**

3. **連接 GitHub 倉庫**
   - 選擇 **"GitHub"** 作為 Git 提供商
   - 如果首次使用，需要授權 Cloudflare 訪問您的 GitHub 帳戶
   - 選擇倉庫：`HKCalvinYau/GLOBAL-CONSTELLATION`
   - 點擊 **"Begin setup"**

### 步驟 2：配置構建設置

在構建設置頁面，填寫以下信息：

#### 項目名稱
- **Project name**: `amar-constellation` 或 `global-constellation`

#### 構建設置
- **Framework preset**: 選擇 **"Astro"**
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/`（留空或填寫 `/`）

#### Node.js 版本
- **Node.js version**: 選擇 `20` 或 `18`（建議使用 20）

### 步驟 3：設置環境變數（重要！）

點擊 **"Environment variables"** 或 **"Variables"** 標籤，添加以下環境變數：

#### 生產環境（Production）
```
KEYSTATIC_GITHUB_OWNER=HKCalvinYau
KEYSTATIC_GITHUB_REPO=GLOBAL-CONSTELLATION
KEYSTATIC_GITHUB_TOKEN=您的GitHub_Personal_Access_Token
```

#### 如何獲取 GitHub Token
1. 前往：https://github.com/settings/tokens
2. 點擊 **"Generate new token"** > **"Generate new token (classic)"**
3. 填寫：
   - **Note**: `Cloudflare Pages - Keystatic`
   - **Expiration**: 選擇合適的過期時間（建議 90 天或無過期）
   - **Scopes**: 勾選 `repo`（完整倉庫權限）
4. 點擊 **"Generate token"**
5. **複製 token**（只顯示一次，請妥善保存）

### 步驟 4：保存並部署

1. 點擊 **"Save and Deploy"**
2. Cloudflare 會自動開始構建和部署
3. 構建完成後，您會獲得一個 URL，例如：`https://amar-constellation.pages.dev`

## 🔄 自動部署設置

### 確認自動部署已啟用

1. 在 Cloudflare Pages 項目頁面
2. 點擊 **"Settings"** > **"Builds & deployments"**
3. 確認以下設置：
   - ✅ **"Automatic deployments"** 已啟用
   - ✅ **"Deploy on push"** 已啟用
   - ✅ **"Deploy on pull request"**（可選）

### 分支設置

- **Production branch**: `main`
- **Preview deployments**: 啟用（可選）

## 🚨 常見問題

### 問題 1：推送後沒有自動部署

**解決方案**：
1. 檢查 Cloudflare Pages 項目是否已連接到 GitHub 倉庫
2. 確認 **"Automatic deployments"** 已啟用
3. 檢查 GitHub 倉庫的 Webhook 設置：
   - 前往 GitHub 倉庫 > Settings > Webhooks
   - 確認有 Cloudflare 的 webhook

### 問題 2：構建失敗

**可能原因**：
1. 構建命令錯誤
2. 環境變數未設置
3. Node.js 版本不兼容

**解決方案**：
1. 檢查 Cloudflare Pages 的構建日誌
2. 確認環境變數已正確設置
3. 嘗試在本地運行 `npm run build` 測試構建

### 問題 3：構建成功但網站不更新

**解決方案**：
1. 清除瀏覽器緩存
2. 檢查 Cloudflare Pages 的部署狀態
3. 確認部署已完成（不是正在進行中）

## 📝 手動觸發部署

如果需要手動觸發部署：

1. 在 Cloudflare Pages 項目頁面
2. 點擊 **"Deployments"** 標籤
3. 點擊 **"Retry deployment"** 或 **"Create deployment"**
4. 選擇要部署的分支（通常是 `main`）

## 🔍 檢查部署狀態

1. 在 Cloudflare Pages 項目頁面
2. 點擊 **"Deployments"** 標籤
3. 查看最新的部署狀態：
   - ✅ **Success**: 部署成功
   - ⏳ **Building**: 正在構建
   - ❌ **Failed**: 構建失敗（點擊查看錯誤日誌）

## 📌 重要提示

1. **首次設置**：必須在 Cloudflare Dashboard 中手動創建項目並連接 GitHub
2. **環境變數**：必須設置 `KEYSTATIC_GITHUB_TOKEN` 才能使用 Keystatic
3. **構建時間**：首次構建可能需要 5-10 分鐘
4. **自動部署**：設置完成後，每次推送到 `main` 分支都會自動觸發部署

## 🎯 快速檢查清單

- [ ] 已在 Cloudflare Dashboard 創建 Pages 項目
- [ ] 已連接 GitHub 倉庫 `HKCalvinYau/GLOBAL-CONSTELLATION`
- [ ] 已設置構建命令：`npm run build`
- [ ] 已設置輸出目錄：`dist`
- [ ] 已添加環境變數：`KEYSTATIC_GITHUB_OWNER`、`KEYSTATIC_GITHUB_REPO`、`KEYSTATIC_GITHUB_TOKEN`
- [ ] 已啟用自動部署
- [ ] 已測試推送並確認自動部署工作

## 🔗 相關鏈接

- Cloudflare Pages 文檔：https://developers.cloudflare.com/pages/
- Astro 部署指南：https://docs.astro.build/en/guides/deploy/cloudflare/
- GitHub Token 創建：https://github.com/settings/tokens

