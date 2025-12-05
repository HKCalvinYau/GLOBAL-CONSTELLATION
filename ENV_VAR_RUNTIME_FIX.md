# 🔴 環境變數已設置但仍無法讀取 - 解決方案

## 問題診斷

環境變數已在 Cloudflare Pages 設置，但運行時仍然讀取不到。這通常是因為：

1. **沒有重新部署**（最常見）
2. **環境變數類型問題**（需要是運行時變數，不是構建時變數）

## ✅ 解決方案

### 方案 1：重新部署（最重要）

環境變數設置後，**必須重新部署**才能生效：

1. 在 Cloudflare Dashboard 中：
   - 進入 **Pages** → `global-constellation`
   - 點擊 **Deployments** 標籤
   - 找到最新的部署
   - 點擊 **Retry deployment** 或 **Redeploy** 按鈕

2. 等待部署完成（約 2-3 分鐘）

### 方案 2：確認變數類型

在 Cloudflare Pages 中，環境變數應該設置為：

- **Type**: `Plaintext`（✅ 正確）
- **不是** `Secret`（除非需要隱藏）

### 方案 3：檢查變數名稱

確認變數名稱完全匹配（大小寫敏感）：
- ✅ `KEYSTATIC_GITHUB_OWNER`
- ✅ `KEYSTATIC_GITHUB_REPO`
- ✅ `KEYSTATIC_GITHUB_TOKEN`

### 方案 4：清除緩存並重新訪問

1. 使用無痕模式訪問測試頁面
2. 或清除瀏覽器緩存
3. 強制刷新（Ctrl+F5 或 Cmd+Shift+R）

## 🔍 驗證步驟

重新部署後：

1. **等待 2-3 分鐘讓部署完成**

2. **訪問測試頁面**：
   ```
   https://global-constellation.pages.dev/keystatic-test
   ```

3. **應該看到**：
   - ✅ `KEYSTATIC_GITHUB_OWNER: ✅ 已設置: HKCalvinYau`
   - ✅ `KEYSTATIC_GITHUB_REPO: ✅ 已設置: GLOBAL-CONSTELLATION`
   - ✅ `KEYSTATIC_GITHUB_TOKEN: ✅ 已設置`

4. **如果仍然顯示未設置**：
   - 查看 Cloudflare Pages 的 **Real-time Logs**
   - 檢查是否有錯誤訊息
   - 確認部署已完成

## ⚠️ 重要提醒

### 必須重新部署

**環境變數設置後，必須重新部署才能生效！**

即使變數已經設置，如果不重新部署，運行時仍然讀取不到。

### 部署方式

有兩種方式觸發重新部署：

1. **手動重新部署**（推薦）：
   - Deployments → Retry deployment

2. **推送新代碼**：
   - 推送任何代碼變更會觸發自動部署

## 📝 檢查清單

- [ ] 環境變數已設置（✅ 已完成）
- [ ] 變數類型是 "Plaintext"（✅ 正確）
- [ ] 變數名稱完全匹配（✅ 正確）
- [ ] **已重新部署**（⏳ **必須執行**）
- [ ] 部署已完成
- [ ] 測試頁面顯示環境變數已設置

---

**現在請立即重新部署，然後再次訪問測試頁面！**

