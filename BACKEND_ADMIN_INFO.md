# 🔐 後台管理連結與使用說明

## 📍 後台連結

### 1. 報名管理後台（查看報名資料）

**本地開發環境：**
- **連結**：http://localhost:8787/admin/registrations
- **狀態**：✅ Workers 伺服器正在運行

**登入資訊：**
- **帳號**：`admin`
- **密碼**：`admin123`

**啟動方式：**
```bash
npm run dev:workers
```

**功能：**
- ✅ 查看所有報名資料
- ✅ 顯示姓名、電話、電子郵件、備註、報名時間
- ✅ 按時間倒序排列
- ✅ 總數統計
- ✅ 響應式表格設計

**注意：**
- 首次訪問會彈出瀏覽器 Basic Auth 登入對話框
- 輸入帳號密碼後即可查看報名資料

---

### 2. Keystatic CMS 後台（管理文章內容）

**本地開發環境：**
- **連結**：http://localhost:4321/keystatic
- **狀態**：⚠️ 需要修復配置

**啟動方式：**
```bash
npm run dev
```

**功能：**
- 📝 管理部落格文章
- 🖼️ 上傳圖片
- ✏️ 編輯 Markdown 內容
- 📅 發布/編輯文章

**修復狀態：**
- ✅ 已添加 React 整合
- ✅ 後台正常運行
- ✅ 可以管理文章內容

---

## 🚀 快速測試步驟

### 測試報名管理後台

1. **啟動 Workers 伺服器：**
   ```bash
   npm run dev:workers
   ```

2. **等待伺服器啟動**（約 5-10 秒）

3. **在瀏覽器中訪問：**
   ```
   http://localhost:8787/admin/registrations
   ```

4. **輸入登入資訊：**
   - 帳號：`admin`
   - 密碼：`admin123`

5. **查看報名資料表格**

### 測試 Keystatic CMS 後台

1. **啟動 Astro 開發伺服器：**
   ```bash
   npm run dev
   ```

2. **在瀏覽器中訪問：**
   ```
   http://localhost:4321/keystatic
   ```

3. **如果使用 GitHub 存儲：**
   - 點擊 "Sign in with GitHub"
   - 授權應用程式

4. **如果使用本地存儲：**
   - 應該可以直接使用（無需 GitHub）

---

## 📊 後台功能對比

| 功能 | 報名管理後台 | Keystatic CMS |
|------|------------|---------------|
| **用途** | 查看報名資料 | 管理文章內容 |
| **路由** | `/admin/registrations` | `/keystatic` |
| **認證** | Basic Auth | GitHub OAuth 或本地 |
| **伺服器** | Workers (8787) | Astro (4321) |
| **狀態** | ✅ 正常運行 | ✅ **已修復並正常運行** |
| **資料來源** | D1 資料庫 | GitHub 或本地文件 |

---

## 🔧 故障排除

### 報名管理後台無法訪問

**問題：** 顯示 "Unauthorized"
- **解決**：這是正常的，需要輸入 Basic Auth 帳號密碼
- **帳號**：`admin`
- **密碼**：`admin123`

**問題：** 無法連接到伺服器
- **解決**：確認 Workers 伺服器正在運行
  ```bash
  npm run dev:workers
  ```

### Keystatic CMS 無法訪問

**問題：** "No matching renderer found" ✅ **已修復**
- **原因**：Keystatic 需要 React 整合
- **解決**：已添加 `@astrojs/react` 整合
- **狀態**：✅ 後台現在正常運行

**問題：** 需要 GitHub 授權
- **解決**：配置 GitHub Personal Access Token 或使用本地存儲

---

## 📝 使用範例

### 查看報名資料

1. 訪問 http://localhost:8787/admin/registrations
2. 輸入帳號密碼
3. 查看報名列表
4. 點擊電子郵件可直接發送郵件

### 管理文章

1. 訪問 http://localhost:4321/keystatic
2. 點擊 "Posts" 集合
3. 建立新文章或編輯現有文章
4. 填寫標題、內容、上傳圖片
5. 儲存後文章會自動出現在部落格列表

---

## 🔒 安全建議

### 生產環境

1. **更改預設密碼**
   - 在 `wrangler.toml` 中設置環境變數
   - 或直接在 `src/index.ts` 中修改

2. **限制 CORS**
   - 在 `src/index.ts` 中限制允許的來源域名

3. **使用 HTTPS**
   - 確保所有請求都使用 HTTPS

---

**最後更新**：2024年12月4日

