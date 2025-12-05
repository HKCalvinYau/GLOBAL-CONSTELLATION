# 部署指南

## 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 登入 Cloudflare

```bash
wrangler login
```

### 3. 建立 D1 資料庫

```bash
npm run db:create
```

**重要**：複製輸出的 `database_id`，更新到 `wrangler.toml`：

```toml
[[d1_databases]]
binding = "DB"
database_name = "global-constellation-db"
database_id = "YOUR_DATABASE_ID_HERE"  # 貼上這裡
```

### 4. 初始化資料庫（本地）

```bash
npm run db:migrate:local
```

### 5. 本地測試

```bash
npm run dev
```

訪問：
- 前端：http://localhost:8787
- API：http://localhost:8787/api/register
- 管理後台：http://localhost:8787/admin/registrations
  - 帳號：`admin`
  - 密碼：`admin123`

### 6. 部署到生產環境

#### 6.1 建立生產環境資料庫（如果尚未建立）

```bash
npm run db:create
```

#### 6.2 更新 wrangler.toml

將生產環境的 `database_id` 更新到 `wrangler.toml`

#### 6.3 執行資料庫遷移（生產環境）

```bash
npm run db:migrate
```

#### 6.4 部署 Workers

```bash
npm run deploy
```

部署完成後，您會得到一個 URL，例如：
```
https://global-constellation-api.your-subdomain.workers.dev
```

### 7. 配置前端 API 端點

在 `index.html` 的 `handleFormSubmit` 函數中，更新 API URL：

```javascript
// 選項 1：使用完整的 Workers URL
const apiUrl = 'https://global-constellation-api.your-subdomain.workers.dev/api/register';

// 選項 2：如果前端和後端在同一域名（使用 Cloudflare Pages + Workers）
const apiUrl = '/api/register';
```

### 8. 部署前端（可選）

如果使用 Cloudflare Pages：

1. 將專案推送到 GitHub
2. 在 Cloudflare Dashboard 中創建新的 Pages 專案
3. 連接 GitHub 倉庫
4. 構建設置：
   - 構建命令：無（靜態網站）
   - 輸出目錄：`/`
5. 部署

## 環境變數配置

### 更改管理後台帳號密碼

在 `src/index.ts` 中修改：

```typescript
app.get('/admin/registrations', basicAuth({
  username: 'your-username',  // 更改這裡
  password: 'your-password',   // 更改這裡
}), async (c) => {
```

或者使用環境變數（需要在 `wrangler.toml` 中設置）：

```toml
[vars]
ADMIN_USERNAME = "your-username"
ADMIN_PASSWORD = "your-password"
```

然後在 `src/index.ts` 中使用：

```typescript
app.get('/admin/registrations', basicAuth({
  username: (c) => c.env.ADMIN_USERNAME,
  password: (c) => c.env.ADMIN_PASSWORD,
}), async (c) => {
```

## 常用指令

```bash
# 開發
npm run dev

# 資料庫操作
npm run db:create              # 建立資料庫
npm run db:migrate              # 生產環境遷移
npm run db:migrate:local        # 本地遷移
npm run db:query "SELECT * FROM registrations"  # 查詢

# 部署
npm run deploy                  # 部署 Workers
```

## 疑難排解

### 問題：`wrangler: command not found`

解決方案：
```bash
npm install -g wrangler
# 或
npm install wrangler --save-dev
```

### 問題：資料庫查詢失敗

檢查：
1. `wrangler.toml` 中的 `database_id` 是否正確
2. 是否已執行 `npm run db:migrate`
3. 資料庫名稱是否正確

### 問題：API 請求失敗（CORS）

確認：
1. Workers 已正確部署
2. API URL 是否正確
3. 檢查瀏覽器控制台的錯誤訊息

### 問題：管理後台無法訪問

確認：
1. Basic Auth 帳號密碼是否正確
2. 瀏覽器是否支援 Basic Auth
3. 檢查 Workers 日誌

## 安全建議

1. **更改預設密碼**：生產環境務必更改管理後台的帳號密碼
2. **限制 CORS**：在 `src/index.ts` 中限制允許的來源域名
3. **使用環境變數**：敏感資訊（如密碼）使用環境變數而非硬編碼
4. **HTTPS**：確保所有請求都使用 HTTPS

## 下一步

- [ ] 添加報名資料匯出功能（CSV/Excel）
- [ ] 添加報名資料搜尋和篩選
- [ ] 添加郵件通知功能
- [ ] 優化錯誤處理和日誌記錄
- [ ] 添加報名限額檢查

