# Keystatic 500 錯誤修復指南

## 🔍 問題

訪問 `https://global-constellation.pages.dev/keystatic` 時出現：
```
GET https://global-constellation.pages.dev/keystatic net::ERR_HTTP_RESPONSE_CODE_FAILURE 500 (Internal Server Error)
```

## 🔧 可能的原因

1. **環境變數未正確傳遞到運行時**
2. **Keystatic 配置問題**
3. **GitHub API 認證失敗**
4. **運行時模組加載問題**

## ✅ 解決步驟

### 步驟 1：檢查 Cloudflare Pages 運行時日誌

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 進入 **Pages** → 選擇 `global-constellation` 專案
3. 點擊 **Deployments** 標籤
4. 找到最新的部署，點擊查看詳情
5. 查看 **Runtime logs** 或 **Functions logs**
6. 查找與 Keystatic 相關的錯誤訊息

### 步驟 2：確認環境變數設置

在 Cloudflare Pages 設置中確認：

1. **Settings** → **Environment variables**
2. 確認以下變數已設置：
   - `KEYSTATIC_GITHUB_OWNER` = `HKCalvinYau`
   - `KEYSTATIC_GITHUB_REPO` = `GLOBAL-CONSTELLATION`
   - `KEYSTATIC_GITHUB_TOKEN` = `ghp_...`（如果倉庫是私有的）

3. **重要**：確認選擇了 **All environments**

### 步驟 3：檢查 GitHub Token 權限

1. 訪問：https://github.com/settings/tokens
2. 找到您使用的 Token
3. 確認 Token 有 `repo` 權限
4. 確認 Token 未過期

### 步驟 4：測試環境變數

在 Cloudflare Pages 中，環境變數應該在運行時可用。如果仍然出現 500 錯誤，可能是：

1. **環境變數未正確傳遞**：確認變數名稱完全匹配（大小寫敏感）
2. **Token 格式錯誤**：確認 Token 以 `ghp_` 開頭
3. **倉庫權限問題**：確認 Token 有權限訪問該倉庫

### 步驟 5：檢查 Keystatic 配置

確認 `keystatic.config.ts` 中的配置正確：

```typescript
const getStorage = () => {
  const owner = import.meta.env.KEYSTATIC_GITHUB_OWNER;
  const repo = import.meta.env.KEYSTATIC_GITHUB_REPO;
  const token = import.meta.env.KEYSTATIC_GITHUB_TOKEN;
  
  if (owner && repo) {
    const storage: any = {
      kind: 'github' as const,
      repo: {
        owner,
        name: repo,
      },
    };
    
    if (token) {
      storage.repo.token = token;
    }
    
    return storage;
  }
  
  return {
    kind: 'local' as const,
  };
};
```

## 🧪 診斷方法

### 方法 1：查看錯誤頁面

最新的代碼會顯示詳細的錯誤訊息。訪問 `/keystatic` 時，如果出現錯誤，應該會看到：
- 錯誤訊息
- 環境變數狀態
- 修復建議

### 方法 2：檢查瀏覽器控制台

1. 按 F12 打開開發者工具
2. 查看 **Console** 標籤
3. 查看 **Network** 標籤
4. 點擊失敗的請求，查看 **Response** 標籤

### 方法 3：檢查 Cloudflare 日誌

在 Cloudflare Dashboard 中：
1. **Analytics & Logs** → **Workers & Pages**
2. 查看實時日誌
3. 過濾 `/keystatic` 相關的請求
4. 查看錯誤訊息

## 🔄 重新部署

如果修改了環境變數：

1. 確認所有環境變數已保存
2. 點擊 **Deployments** → **Retry deployment**
3. 或推送新代碼觸發部署

## 📝 檢查清單

- [ ] 環境變數 `KEYSTATIC_GITHUB_OWNER` 已設置 = `HKCalvinYau`
- [ ] 環境變數 `KEYSTATIC_GITHUB_REPO` 已設置 = `GLOBAL-CONSTELLATION`
- [ ] 環境變數 `KEYSTATIC_GITHUB_TOKEN` 已設置（如果倉庫是私有的）
- [ ] 所有環境變數都選擇了 **All environments**
- [ ] GitHub Token 有 `repo` 權限
- [ ] GitHub Token 未過期
- [ ] 已查看 Cloudflare Pages 運行時日誌
- [ ] 已重新部署

## 🆘 如果仍然無法解決

請提供以下信息：

1. **Cloudflare Pages 運行時日誌**中的錯誤訊息
2. **瀏覽器控制台**中的錯誤訊息
3. **環境變數設置截圖**（隱藏 Token 值）
4. **GitHub Token 權限截圖**

---

**最後更新：2024年12月5日**

