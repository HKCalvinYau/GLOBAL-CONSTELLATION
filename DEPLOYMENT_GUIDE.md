# 部署指南 - AMAR 國際家族系統排列課程網站

## 📋 專案架構

本專案包含兩個部分：
1. **前端**：Astro 網站（部署到 Cloudflare Pages）
2. **後端**：Cloudflare Workers + Hono + D1（部署到 Cloudflare Workers）

---

## 🔧 前置準備

### 1. 安裝必要工具

```bash
# 確保 Node.js 18+ 已安裝
node --version

# 安裝專案依賴
npm install

# 安裝 Wrangler CLI（如果尚未安裝）
npm install -g wrangler

# 或使用本地安裝
npm install --save-dev wrangler
```

### 2. 登入 Cloudflare

```bash
# 登入 Cloudflare 帳號
wrangler login

# 驗證登入狀態
wrangler whoami
```

---

## 🗄️ 步驟 1：設置 D1 資料庫

### 1.1 建立生產環境資料庫

```bash
# 建立 D1 資料庫
npm run db:create

# 或直接使用 wrangler
wrangler d1 create global-constellation-db
```

**輸出範例：**
```
✅ Successfully created DB 'global-constellation-db'!

[[d1_databases]]
binding = "DB"
database_name = "global-constellation-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"  # 複製這個 ID
```

### 1.2 更新 wrangler.toml

將 `wrangler.toml` 中的 `database_id` 更新為剛才得到的 ID：

```toml
[[d1_databases]]
binding = "DB"
database_name = "global-constellation-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"  # 替換這裡
```

### 1.3 執行資料庫遷移

```bash
# 在生產環境執行資料庫遷移
npm run db:migrate

# 或直接使用 wrangler
wrangler d1 execute global-constellation-db --file=./schema.sql
```

### 1.4 驗證資料庫

```bash
# 查詢資料庫結構
wrangler d1 execute global-constellation-db --command="SELECT name FROM sqlite_master WHERE type='table';"
```

---

## 🚀 步驟 2：部署後端 API（Cloudflare Workers）

### 2.1 檢查配置

確認 `wrangler.toml` 配置正確：

```toml
name = "global-constellation-api"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[[d1_databases]]
binding = "DB"
database_name = "global-constellation-db"
database_id = "YOUR_DATABASE_ID_HERE"  # 必須更新

[vars]
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"  # 建議更改為更安全的密碼
```

### 2.2 部署 Workers

```bash
# 部署到 Cloudflare Workers
npm run deploy

# 或直接使用 wrangler
wrangler deploy
```

**部署成功後，您會得到一個 URL：**
```
https://global-constellation-api.your-account.workers.dev
```

### 2.3 測試 API

```bash
# 測試報名 API
curl -X POST https://global-constellation-api.your-account.workers.dev/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "測試用戶",
    "phone": "0912345678",
    "email": "test@example.com",
    "message": "測試訊息"
  }'

# 測試管理後台（需要 Basic Auth）
# 在瀏覽器中訪問：
# https://global-constellation-api.your-account.workers.dev/admin/registrations
# 帳號：admin / 密碼：admin123
```

---

## 🌐 步驟 3：部署前端（Cloudflare Pages）

### 3.1 更新 Astro 配置

在 `astro.config.mjs` 中更新 `site` URL：

```javascript
export default defineConfig({
  site: 'https://your-domain.pages.dev', // 更新為您的 Cloudflare Pages 域名
  // ... 其他配置
});
```

### 3.2 構建專案

```bash
# 構建 Astro 專案
npm run build

# 檢查構建結果
ls -la dist/
```

### 3.3 部署到 Cloudflare Pages

#### 方法 A：使用 Wrangler（推薦）

```bash
# 安裝 @cloudflare/pages-plugin
npm install --save-dev @cloudflare/pages-plugin

# 部署到 Cloudflare Pages
wrangler pages deploy dist
```

#### 方法 B：使用 Cloudflare Dashboard

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 選擇 **Pages** → **Create a project**
3. 連接您的 GitHub 倉庫（推薦）或直接上傳 `dist` 文件夾
4. 設置構建命令：`npm run build`
5. 設置構建輸出目錄：`dist`
6. 點擊 **Save and Deploy**

### 3.4 配置環境變數（如果需要）

在 Cloudflare Pages 設置中添加環境變數：
- `KEYSTATIC_GITHUB_OWNER`（如果使用 GitHub 存儲）
- `KEYSTATIC_GITHUB_REPO`（如果使用 GitHub 存儲）

---

## 🔗 步驟 4：連接前端和後端

### 4.1 更新前端 API 端點

如果前端和後端使用不同的域名，需要更新前端的 API URL。

在 `src/pages/index.astro` 中，找到表單提交函數：

```javascript
// 在 handleFormSubmit 函數中
const apiUrl = 'https://global-constellation-api.your-account.workers.dev/api/register';
```

### 4.2 設置 CORS（如果需要）

如果前端和後端使用不同域名，確保 `src/index.ts` 中的 CORS 設置正確：

```typescript
// 允許所有來源（生產環境建議限制特定域名）
c.header('Access-Control-Allow-Origin', '*');
```

**生產環境建議：**
```typescript
// 只允許特定域名
const allowedOrigins = ['https://your-domain.pages.dev', 'https://your-custom-domain.com'];
const origin = c.req.header('Origin');
if (allowedOrigins.includes(origin || '')) {
  c.header('Access-Control-Allow-Origin', origin || '');
}
```

---

## ✅ 步驟 5：驗證部署

### 5.1 檢查前端

- [ ] 訪問首頁，確認所有內容正常顯示
- [ ] 測試導航功能
- [ ] 測試表單提交功能
- [ ] 檢查部落格頁面
- [ ] 檢查相片庫頁面
- [ ] 檢查學員見證頁面

### 5.2 檢查後端

- [ ] 測試報名 API：提交表單並確認成功
- [ ] 測試管理後台：訪問 `/admin/registrations` 並確認可以查看報名資料
- [ ] 檢查資料庫：確認資料正確寫入

### 5.3 檢查資料庫

```bash
# 查詢所有報名資料
wrangler d1 execute global-constellation-db --command="SELECT * FROM registrations;"
```

---

## 🔄 更新部署

### 更新後端

```bash
# 修改代碼後
npm run deploy
```

### 更新前端

```bash
# 修改代碼後
npm run build
wrangler pages deploy dist
```

或如果使用 GitHub 連接，直接推送代碼即可自動部署。

---

## 🛠️ 故障排除

### 問題 1：資料庫連接失敗

**解決方法：**
1. 確認 `wrangler.toml` 中的 `database_id` 正確
2. 確認資料庫已建立：`wrangler d1 list`
3. 確認資料庫遷移已執行：`npm run db:migrate`

### 問題 2：API 返回 CORS 錯誤

**解決方法：**
1. 檢查 `src/index.ts` 中的 CORS 設置
2. 確認前端域名在允許列表中

### 問題 3：構建失敗

**解決方法：**
1. 清除緩存：`rm -rf .astro dist node_modules/.vite`
2. 重新安裝依賴：`rm -rf node_modules && npm install`
3. 檢查 TypeScript 錯誤：`npm run build:check`

**注意：** 如果構建時出現 "無法讀取部落格文章" 的警告，這是正常的。在構建時如果沒有設置 `KEYSTATIC_GITHUB_OWNER` 和 `KEYSTATIC_GITHUB_REPO` 環境變數，部落格文章將不會被預渲染，但網站仍然可以正常運行。

### 問題 4：Keystatic 後台無法訪問

**解決方法：**
1. 確認環境變數已設置（如果使用 GitHub 存儲）
2. 確認 React 整合已安裝：`npm list @astrojs/react`
3. 檢查 `keystatic.config.ts` 配置

---

## 📝 重要提醒

1. **安全性**：
   - 更改預設的管理員密碼（在 `wrangler.toml` 中）
   - 生產環境限制 CORS 來源
   - 考慮使用 Cloudflare Access 保護管理後台

2. **備份**：
   - 定期備份 D1 資料庫
   - 使用 `wrangler d1 export` 導出資料

3. **監控**：
   - 在 Cloudflare Dashboard 中監控 Workers 使用量
   - 設置錯誤告警

4. **域名**：
   - 可以為 Workers 設置自定義域名
   - 可以為 Pages 設置自定義域名

---

## 📞 需要幫助？

如果遇到問題，請檢查：
1. Cloudflare Dashboard 中的錯誤日誌
2. 終端機中的錯誤訊息
3. 瀏覽器控制台的錯誤訊息
4. `fixbug.md` 中的修復記錄

---

**最後更新：2024年12月**

