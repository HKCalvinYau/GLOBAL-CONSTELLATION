# 修復 Cloudflare Pages 構建錯誤

## 🔍 當前問題

從 Cloudflare Pages 部署頁面可以看到：
- ✅ 自動部署已啟用
- ✅ GitHub 連接正常
- ❌ 最近三次部署都失敗了

## 🐛 可能的構建錯誤

根據之前的構建測試，最可能的錯誤是：

```
Cannot bundle Node.js built-in "node:path" imported from "@keystatic/core"
```

這是因為 `createReader` 使用了 Node.js 內建模組，在 Cloudflare Workers 環境中不可用。

## 🔧 解決方案

### 方案 1：修改構建命令（跳過類型檢查）

在 Cloudflare Pages 設置中，將構建命令改為：

```bash
npm install && npm run build
```

但這可能還不夠，因為根本問題是 `createReader` 在構建時的問題。

### 方案 2：使用 GitHub 存儲（推薦）

這是最可靠的解決方案。確保在 Cloudflare Pages 環境變數中設置：

```
KEYSTATIC_GITHUB_OWNER=HKCalvinYau
KEYSTATIC_GITHUB_REPO=GLOBAL-CONSTELLATION
KEYSTATIC_GITHUB_TOKEN=您的GitHub_Token
```

### 方案 3：修改構建配置

我們需要修改 `astro.config.mjs` 來處理這個問題。

## 📋 檢查構建日誌步驟

1. 在 Cloudflare Pages 部署頁面
2. 點擊最近失敗的部署（例如 "main 263cd04"）
3. 點擊 "View details"
4. 查看 "Build logs" 或 "Deployment logs"
5. 找到錯誤訊息並複製

## 🛠️ 臨時解決方案

如果構建持續失敗，可以：

1. **回滾到最後成功的部署**：
   - 在 Cloudflare Pages 中，找到最後成功的部署（main 19d618c）
   - 點擊該部署的 "..." 菜單
   - 選擇 "Promote to production"

2. **修復構建問題後再部署**：
   - 根據構建日誌修復問題
   - 重新推送代碼到 GitHub
   - Cloudflare 會自動重新構建

## 📝 下一步

請在 Cloudflare Pages 中：
1. 點擊最近失敗的部署
2. 查看構建日誌
3. 將錯誤訊息發給我，我會幫您修復

