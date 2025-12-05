# Keystatic 後台問題排除指南

## 🔍 問題診斷

如果訪問 `https://global-constellation.pages.dev/keystatic` 時頁面為空或無法正常顯示，請按照以下步驟排查：

---

## ✅ 解決方案 1：檢查環境變數（最重要）

### 問題
Keystatic 在生產環境中需要 GitHub 環境變數才能正常工作。

### 解決步驟

1. **登入 Cloudflare Dashboard**
   - 訪問：https://dash.cloudflare.com/
   - 進入 **Pages** → 選擇 `global-constellation` 專案

2. **檢查環境變數**
   - 點擊 **Settings** 標籤
   - 滾動到 **Environment variables** 部分
   - 確認以下變數已設置：
     - ✅ `KEYSTATIC_GITHUB_OWNER` = `HKCalvinYau`
     - ✅ `KEYSTATIC_GITHUB_REPO` = `GLOBAL-CONSTELLATION`

3. **如果缺少環境變數**
   - 點擊 **Add variable**
   - 添加 `KEYSTATIC_GITHUB_OWNER` = `HKCalvinYau`
   - 添加 `KEYSTATIC_GITHUB_REPO` = `GLOBAL-CONSTELLATION`
   - **重要**：選擇 **All environments**（Production、Preview、Development）
   - 點擊 **Save**

4. **重新部署**
   - 點擊 **Deployments** 標籤
   - 找到最新的部署
   - 點擊 **Retry deployment**

---

## ✅ 解決方案 2：檢查 GitHub Token（如果倉庫是私有的）

如果您的 GitHub 倉庫是私有的，還需要設置 Token：

1. **創建 GitHub Personal Access Token**
   - 訪問：https://github.com/settings/tokens
   - 點擊 **Generate new token (classic)**
   - 設置：
     - Note: `Keystatic CMS Access`
     - 勾選 `repo` 權限
   - 生成並複製 token

2. **添加到 Cloudflare Pages**
   - 在環境變數中添加：
     - `KEYSTATIC_GITHUB_TOKEN` = `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

3. **重新部署**

---

## ✅ 解決方案 3：檢查構建日誌

1. **查看構建日誌**
   - 在 Cloudflare Pages 中
   - 點擊 **Deployments** 標籤
   - 找到最新的部署
   - 點擊查看構建日誌

2. **查找錯誤**
   - 搜索關鍵字：`keystatic`、`error`、`failed`
   - 檢查是否有相關錯誤訊息

---

## ✅ 解決方案 4：檢查路由配置

確認 `src/pages/keystatic/[...params].astro` 文件存在且配置正確：

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

**重要**：`export const prerender = false;` 必須設置，因為 Keystatic 是動態路由。

---

## ✅ 解決方案 5：檢查 Astro 配置

確認 `astro.config.mjs` 中：
- ✅ `output: 'hybrid'`（必須是 hybrid 模式）
- ✅ `adapter: cloudflare()`（必須使用 Cloudflare 適配器）
- ✅ React 整合已啟用（`react()`）

---

## 🔧 快速檢查清單

在 Cloudflare Pages 設置中確認：

- [ ] 環境變數 `KEYSTATIC_GITHUB_OWNER` 已設置 = `HKCalvinYau`
- [ ] 環境變數 `KEYSTATIC_GITHUB_REPO` 已設置 = `GLOBAL-CONSTELLATION`
- [ ] 環境變數應用於 **All environments**
- [ ] 如果倉庫是私有的，已設置 `KEYSTATIC_GITHUB_TOKEN`
- [ ] 已重新部署（設置環境變數後）

---

## 🧪 測試步驟

1. **設置環境變數後，等待部署完成**
2. **訪問**：`https://global-constellation.pages.dev/keystatic`
3. **預期結果**：
   - ✅ 應該看到 Keystatic 後台界面
   - ✅ 可以選擇不同的集合（文章、標籤、分類等）
   - ✅ 可以創建和編輯內容

---

## ❌ 如果仍然無法工作

### 檢查瀏覽器控制台

1. 打開瀏覽器開發者工具（F12）
2. 查看 **Console** 標籤
3. 查看 **Network** 標籤
4. 記錄任何錯誤訊息

### 常見錯誤

1. **"Reader 未初始化"**
   - 原因：環境變數未設置
   - 解決：設置 GitHub 環境變數並重新部署

2. **"Cannot read property 'xxx' of undefined"**
   - 原因：配置問題
   - 解決：檢查 `keystatic.config.ts` 配置

3. **空白頁面**
   - 原因：可能是環境變數問題或構建問題
   - 解決：檢查構建日誌和環境變數

---

## 📞 需要更多幫助？

如果以上步驟都無法解決問題，請提供：
1. 瀏覽器控制台的錯誤訊息
2. Cloudflare Pages 構建日誌
3. 環境變數設置截圖

---

**最後更新：2024年12月5日**

