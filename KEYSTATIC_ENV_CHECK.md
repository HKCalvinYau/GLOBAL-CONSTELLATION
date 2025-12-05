# Keystatic 環境變數檢查指南

## 🔍 問題診斷

如果訪問 `https://global-constellation.pages.dev/keystatic` 時看到錯誤訊息，這表示環境變數未正確設置。

## ✅ 解決步驟

### 1. 檢查環境變數是否已設置

在 Cloudflare Pages 中：

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 進入 **Pages** → 選擇 `global-constellation` 專案
3. 點擊 **Settings** → **Environment variables**
4. 確認以下變數已設置：

| 變數名稱 | 值 | 必需 |
|---------|-----|------|
| `KEYSTATIC_GITHUB_OWNER` | `HKCalvinYau` | ✅ 是 |
| `KEYSTATIC_GITHUB_REPO` | `GLOBAL-CONSTELLATION` | ✅ 是 |
| `KEYSTATIC_GITHUB_TOKEN` | `ghp_...` | ⚠️ 僅私有倉庫需要 |

### 2. 重要設置

- **Environment**：必須選擇 **All environments**（Production、Preview、Development）
- **變數名稱**：必須完全匹配（大小寫敏感）
- **值**：不能有多餘的空格

### 3. 重新部署

設置環境變數後：
1. 點擊 **Deployments** 標籤
2. 找到最新的部署
3. 點擊 **Retry deployment** 或推送新代碼

### 4. 驗證

部署完成後，訪問 `https://global-constellation.pages.dev/keystatic`：

- ✅ **如果看到錯誤訊息**：按照錯誤訊息中的指示操作
- ✅ **如果看到 Keystatic 後台**：設置成功！

## 🔧 常見問題

### 問題 1：環境變數已設置但還是顯示錯誤

**可能原因：**
- 環境變數只設置了 Production，沒有設置 Preview/Development
- 變數名稱有拼寫錯誤
- 值中有多餘的空格

**解決方法：**
- 確認選擇了 **All environments**
- 檢查變數名稱是否完全匹配
- 重新輸入值，確保沒有多餘空格

### 問題 2：GitHub Token 相關錯誤

**如果倉庫是公開的：**
- 通常不需要 Token
- 如果出現認證錯誤，可能需要添加 Token

**如果倉庫是私有的：**
- 必須設置 `KEYSTATIC_GITHUB_TOKEN`
- Token 需要有 `repo` 權限

### 問題 3：仍然無法訪問

1. **檢查構建日誌**：
   - 在 Cloudflare Pages 中查看構建日誌
   - 查找與 Keystatic 相關的錯誤

2. **檢查瀏覽器控制台**：
   - 按 F12 打開開發者工具
   - 查看 Console 和 Network 標籤
   - 記錄任何錯誤訊息

3. **清除緩存**：
   - 嘗試使用無痕模式訪問
   - 或清除瀏覽器緩存

## 📝 環境變數設置截圖檢查清單

在 Cloudflare Pages 設置中確認：

- [ ] `KEYSTATIC_GITHUB_OWNER` 已設置 = `HKCalvinYau`
- [ ] `KEYSTATIC_GITHUB_REPO` 已設置 = `GLOBAL-CONSTELLATION`
- [ ] 兩個變數都選擇了 **All environments**
- [ ] 變數名稱完全匹配（無拼寫錯誤）
- [ ] 值中沒有多餘空格
- [ ] 如果倉庫是私有的，已設置 `KEYSTATIC_GITHUB_TOKEN`
- [ ] 已重新部署（設置後）

---

**最後更新：2024年12月5日**

