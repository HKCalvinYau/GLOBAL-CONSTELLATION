# 後台訪問指南

本專案有兩個後台系統，用於不同的管理功能。

---

## 📝 後台 1：Keystatic CMS 後台（內容管理）

### 功能
用於管理網站的所有內容：
- ✅ **文章管理**：新增、編輯、刪除部落格文章
- ✅ **標籤管理**：新增、編輯、刪除標籤
- ✅ **分類管理**：新增、編輯、刪除分類（可設定顏色）
- ✅ **相片庫管理**：新增、編輯、刪除相片
- ✅ **學員見證管理**：新增、編輯、刪除學員見證

### 訪問連結

#### 本地開發環境
```
http://localhost:4321/keystatic
```

#### 生產環境（部署後）
```
https://your-domain.pages.dev/keystatic
```
（將 `your-domain.pages.dev` 替換為您的實際 Cloudflare Pages 域名）

### 登入方式
- **不需要帳號密碼**
- 但需要設置 GitHub 環境變數才能使用（如果使用 GitHub 存儲）

### 設置要求
如果使用 GitHub 存儲，需要在 Cloudflare Pages 設置環境變數：
- `KEYSTATIC_GITHUB_OWNER` = `HKCalvinYau`
- `KEYSTATIC_GITHUB_REPO` = `GLOBAL-CONSTELLATION`

**詳細設置步驟：** 請參考 `KEYSTATIC_GITHUB_SETUP.md`

---

## 📊 後台 2：報名管理後台（報名資料查看）

### 功能
用於查看和管理報名表單提交的資料：
- ✅ 查看所有報名者的資料
- ✅ 顯示姓名、電話、電子郵件、備註、報名時間
- ✅ 按時間倒序排列（最新的在前）

### 訪問連結

#### 本地開發環境
```
http://localhost:8787/admin/registrations
```

#### 生產環境（部署後）
```
https://global-constellation-api.your-account.workers.dev/admin/registrations
```
（將 `global-constellation-api.your-account.workers.dev` 替換為您的實際 Workers URL）

### 登入方式
**Basic Auth 認證：**
- **帳號**：`admin`
- **密碼**：`admin123`

### 如何訪問

#### 方法 1：直接在瀏覽器中訪問
1. 在瀏覽器地址欄輸入後台 URL
2. 瀏覽器會彈出登入視窗
3. 輸入帳號：`admin`
4. 輸入密碼：`admin123`
5. 點擊「登入」或「確定」

#### 方法 2：使用 URL 格式（不推薦，安全性較低）
```
https://admin:admin123@global-constellation-api.your-account.workers.dev/admin/registrations
```

### 更改密碼（建議）

為了安全，建議更改預設密碼：

1. **編輯 `wrangler.toml` 文件**：
```toml
[vars]
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "your-new-secure-password"  # 更改這裡
```

2. **重新部署 Workers**：
```bash
npm run deploy
```

---

## 🔍 如何找到您的實際 URL

### Keystatic CMS 後台 URL

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 進入 **Pages** → 選擇您的專案
3. 在專案頁面頂部會顯示您的域名，例如：
   - `https://global-constellation-abc123.pages.dev`
4. 後台 URL 就是：`https://global-constellation-abc123.pages.dev/keystatic`

### 報名管理後台 URL

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 進入 **Workers & Pages** → **Workers**
3. 找到您的 Workers 專案（名稱在 `wrangler.toml` 中定義：`global-constellation-api`）
4. 點擊專案名稱，會顯示 URL，例如：
   - `https://global-constellation-api.your-account.workers.dev`
5. 後台 URL 就是：`https://global-constellation-api.your-account.workers.dev/admin/registrations`

---

## 📋 快速參考

### Keystatic CMS 後台
- **本地**：`http://localhost:4321/keystatic`
- **生產**：`https://your-domain.pages.dev/keystatic`
- **登入**：不需要（但需要 GitHub 環境變數）

### 報名管理後台
- **本地**：`http://localhost:8787/admin/registrations`
- **生產**：`https://your-workers-url.workers.dev/admin/registrations`
- **帳號**：`admin`
- **密碼**：`admin123`

---

## ⚠️ 重要提醒

1. **安全性**：
   - 報名管理後台的預設密碼應該更改
   - 不要在公開場所分享後台連結和密碼

2. **訪問權限**：
   - Keystatic 後台：任何人都可以訪問（如果知道 URL）
   - 報名管理後台：需要 Basic Auth 認證

3. **如果無法訪問**：
   - 確認 Workers 已正確部署
   - 確認環境變數已設置（Keystatic）
   - 確認帳號密碼正確（報名管理後台）

---

**最後更新：2024年12月5日**

