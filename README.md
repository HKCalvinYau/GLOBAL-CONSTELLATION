# GLOBAL CONSTELLATION - 國際家族系統排列課程網站

## 專案簡介

這是一個關於國際家族系統排列（Family Constellation）課程的全端網站專案。前端使用 **Astro** + **Tailwind CSS** 構建，後端使用 **Cloudflare Workers** + **Hono** 框架 + **Cloudflare D1** 資料庫。提供課程介紹、導師資訊、學員見證、早鳥報名功能和部落格系統，並包含管理後台查看報名資料。使用 **Keystatic CMS** 管理部落格內容。

## 專案結構

```
GLOBAL CONSELL/
├── src/
│   └── index.ts       # Hono 後端 API（Cloudflare Workers）
├── index.html         # 前端落地頁面
├── schema.sql         # D1 資料庫 Schema
├── package.json        # Node.js 依賴和腳本
├── wrangler.toml      # Cloudflare Workers 配置
├── tsconfig.json      # TypeScript 配置
├── README.md          # 專案說明文件
├── fixbug.md          # Bug 修復記錄文件
└── .gitignore         # Git 忽略文件
```

## 功能說明

### 1. 導航欄（Navbar）
- **位置**：頁面頂部固定導航
- **功能**：
  - 桌面版：顯示完整導航選單（生命卡點、系統原理、導師介紹、學員見證、立即報名）
  - 手機版：漢堡選單，點擊展開/收起
  - 滾動時自動改變樣式（背景變為半透明白色，添加陰影）
- **滾動行為**：點擊導航按鈕會平滑滾動到對應區塊

### 2. Hero Section（首頁橫幅）
- **位置**：頁面最頂部
- **內容**：
  - 主標題：「看見隱形的牽連，讓愛與豐盛重新流動」
  - 副標題：介紹家族系統排列的概念
  - 兩個行動按鈕：「開啟療癒之旅」和「了解排列原理」
  - 用戶見證統計：顯示「已有超過 10,000+ 人次見證改變」
- **視覺效果**：漸變背景、浮動動畫元素

### 3. 生命卡點區塊（Problem Section）
- **ID**：`problem`
- **內容**：展示三個常見的生命困境
  - 情感關係受阻
  - 莫名的情緒重擔
  - 事業與金錢卡關
- **設計**：卡片式佈局，每個卡片包含圖標、標題和描述

### 4. 系統原理區塊（Methodology Section）
- **ID**：`method`
- **內容**：
  - 介紹家族系統排列的三個核心法則：
    - 整體法則
    - 序位法則
    - 平衡法則
  - 海寧格的名言引用
  - 說明為什麼這對現代人重要
- **SEO 優化**：包含隱藏的結構化內容供搜索引擎讀取

### 5. 導師介紹區塊（Instructor Section）
- **ID**：`instructor`
- **內容**：
  - 導師姓名：**Dr. LOBO LAU 老師**
  - 導師引言
  - 導師背景介紹（20年經驗、師承德國海寧格學院等）
  - 認證標籤：德國海寧格科學中心認證、國際系統排列協會資深會員等

### 6. 常見問題區塊（FAQ Section）
- **內容**：四個常見問題及答案
  - 是否需要帶家人參加？
  - 排列是否科學？
  - 課程後會有什麼改變？
  - 什麼樣的人適合參加？
- **互動**：使用 HTML5 `<details>` 標籤實現展開/收起效果

### 7. 報名區塊（Offer Section）
- **ID**：`offer`
- **內容**：
  - 課程名稱：「【歸位・重生】國際家族系統排列深度工作坊」
  - 日期：2024年 12月 15-16日
  - 地點：台北市
  - 價格：原價 NT$ 28,000，早鳥優惠 NT$ 16,800
  - 限額：僅限 30 位學員，目前僅剩 5 席
- **早鳥報名表單**：
  - 姓名（必填）
  - 聯絡電話（必填）
  - 電子郵件（必填）
  - 想了解的問題或備註（選填）
  - 同意接收課程相關資訊（必填）
  - 提交按鈕：「立即搶佔席位」
- **表單功能**：
  - 前端驗證
  - 提交後顯示成功訊息
  - 可連接後端 API 或 Cloudflare Workers 處理表單數據

### 8. 部落格系統（Blog System）
- **功能**：
  - 部落格列表頁：顯示所有文章，按發布日期排序
  - 文章內頁：完整文章內容展示
  - 閱讀量統計：每篇文章顯示閱讀次數
  - 標籤系統：文章可添加多個標籤
  - 分類系統：文章可歸類到特定分類
  - 標籤和分類管理：在 Keystatic 後台可新增、修改、刪除標籤和分類
- **管理後台**：
  - 訪問：`http://localhost:4321/keystatic`
  - 功能：
    - 文章管理（新增、編輯、刪除）
    - 標籤管理（新增、編輯、刪除）
    - 分類管理（新增、編輯、刪除，支援自訂顏色）
    - 閱讀量設定
- **文章欄位**：
  - 標題（自動生成 URL 友好的 slug，不在編輯界面顯示）
  - 發布日期
  - 封面圖片
  - 摘要
  - 閱讀量（整數，預設為 0）
  - 標籤（多選，關聯到標籤集合）
  - 分類（單選，關聯到分類集合）
  - 內容（支援 Markdown 格式）

### 9. 頁尾（Footer）
- **內容**：
  - 公司資訊和簡介
  - 連結區塊（關於我們、課程資訊、部落格）
  - 法律區塊（隱私權政策、服務條款）
  - 電子報訂閱表單
  - 版權資訊

## 技術規格

### 前端技術
- **框架**：Astro 4.0+（靜態網站生成器）
- **樣式**：Tailwind CSS 3.4+（整合）
- **CMS**：Keystatic 5.0+（內容管理系統）
- **圖標**：SVG 圖標（內嵌）
- **動畫**：CSS 動畫和 Tailwind 動畫類
- **JavaScript**：原生 JavaScript（無框架依賴）

### 後端技術
- **運行環境**：Cloudflare Workers
- **框架**：Hono（輕量級 Web 框架）
- **資料庫**：Cloudflare D1（SQLite）
- **語言**：TypeScript
- **認證**：Basic Auth（管理後台）

### 部署方式
- **前端**：Cloudflare Pages（靜態網站）
- **後端**：Cloudflare Workers（Serverless 函數）
- **資料庫**：Cloudflare D1（邊緣資料庫）

### 文件結構
```
GLOBAL CONSELL/
├── src/
│   ├── pages/
│   │   ├── index.astro          # 首頁
│   │   ├── blog/
│   │   │   ├── index.astro     # 部落格列表頁
│   │   │   └── [slug].astro    # 文章內頁
│   │   └── keystatic/
│   │       └── [...params].astro  # Keystatic 後台
│   ├── layouts/
│   │   └── Layout.astro         # 主要 Layout
│   ├── content/
│   │   ├── posts/              # 文章內容（Keystatic 管理）
│   │   ├── tags/               # 標籤內容（Keystatic 管理）
│   │   └── categories/         # 分類內容（Keystatic 管理）
│   └── index.ts                # Hono 後端 API
├── public/
│   └── images/
│       └── posts/              # 文章圖片
├── index.html                   # 原始 HTML 文件（已遷移到 Astro）
├── keystatic.config.ts          # Keystatic CMS 配置
├── astro.config.mjs             # Astro 配置
├── schema.sql                   # D1 資料庫 Schema
├── package.json                 # Node.js 依賴和腳本
├── wrangler.toml                # Cloudflare Workers 配置
├── tsconfig.json                # TypeScript 配置
├── README.md                    # 專案說明文件
└── fixbug.md                    # Bug 修復記錄文件
```

### 樣式系統
- 使用 Tailwind CSS 進行樣式設計
- 主要顏色：
  - 主色：Indigo（靛藍色）
  - 輔助色：Purple（紫色）、Slate（石板灰）
  - 強調色：Rose（玫瑰紅）、Amber（琥珀色）

## 安裝與部署

### 前置需求
- Node.js 18+ 和 npm
- Cloudflare 帳號
- Wrangler CLI（Cloudflare Workers 工具）

### 步驟 1：安裝依賴

```bash
# 安裝專案依賴
npm install

# 安裝 Wrangler CLI（如果尚未安裝）
npm install -g wrangler

# 登入 Cloudflare（首次使用）
wrangler login
```

### 步驟 2：建立 D1 資料庫

```bash
# 建立 D1 資料庫（會得到 database_id）
npm run db:create

# 複製輸出的 database_id，更新到 wrangler.toml 中的 database_id
```

更新 `wrangler.toml`：
```toml
[[d1_databases]]
binding = "DB"
database_name = "global-constellation-db"
database_id = "YOUR_DATABASE_ID_HERE"  # 替換這裡
```

### 步驟 3：初始化資料庫（本地開發）

```bash
# 在本地建立資料表
npm run db:migrate:local
```

### 步驟 4：本地開發

```bash
# 啟動 Astro 開發服務器（前端）
npm run dev

# 前端頁面：http://localhost:4321
# 部落格：http://localhost:4321/blog
# Keystatic 後台：http://localhost:4321/keystatic

# 啟動 Cloudflare Workers 開發服務器（後端 API）
npm run dev:workers

# API 端點：http://localhost:8787/api/register
# 報名管理後台：http://localhost:8787/admin/registrations
# 帳號：admin / 密碼：admin123
```

### 步驟 5：部署到生產環境

```bash
# 1. 在生產環境建立資料庫（如果尚未建立）
npm run db:create

# 2. 更新 wrangler.toml 中的 database_id（使用生產環境的 ID）

# 3. 執行資料庫遷移（生產環境）
npm run db:migrate

# 4. 部署 Workers
npm run deploy
```

部署完成後，您會得到一個 Workers URL，例如：
- `https://global-constellation-api.your-subdomain.workers.dev`

### 步驟 6：配置前端 API 端點

在 `index.html` 中，將 API URL 更新為您的 Workers URL：

```javascript
// 在 handleFormSubmit 函數中
const apiUrl = 'https://global-constellation-api.your-subdomain.workers.dev/api/register';
```

或者，如果您使用 Cloudflare Pages 並設置了自定義域名，可以使用相對路徑：
```javascript
const apiUrl = '/api/register';
```

### 本地開發（僅前端）

如果您只想預覽前端頁面：

```bash
# 使用 Python
python3 -m http.server 8000

# 或使用 Node.js
npx serve
```

然後在瀏覽器中打開 `http://localhost:8000`

### 主要功能使用

#### 導航功能
- 點擊導航欄中的任何按鈕，頁面會平滑滾動到對應區塊
- 手機版點擊漢堡選單圖標展開/收起導航選單

#### 常見問題
- 點擊問題標題展開查看答案
- 再次點擊可收起答案

#### 報名功能
- 填寫表單後點擊「立即搶佔席位」按鈕
- 表單會發送到後端 API 並儲存到 D1 資料庫
- 成功後會顯示成功訊息，失敗會顯示錯誤訊息

#### 管理後台

**報名管理後台**：
- 訪問 `http://localhost:8787/admin/registrations` 查看所有報名資料
- 需要 Basic Auth 認證（帳號：admin，密碼：admin123）
- 顯示所有報名者的姓名、電話、電子郵件、備註和報名時間

**Keystatic CMS 後台**：
- 訪問 `http://localhost:4321/keystatic` 管理部落格內容
- 功能：
  - **文章管理**：新增、編輯、刪除文章
  - **標籤管理**：新增、編輯、刪除標籤
  - **分類管理**：新增、編輯、刪除分類（可設定顏色）
  - 所有內容使用本地文件系統存儲（開發環境）

## 函數說明

### scrollToSection(id)
- **功能**：平滑滾動到指定區塊
- **參數**：
  - `id` (string)：目標區塊的 ID
- **使用範例**：
```javascript
scrollToSection('offer'); // 滾動到報名區塊
```

### toggleMenu(forceClose)
- **功能**：切換手機版選單的展開/收起狀態
- **參數**：
  - `forceClose` (boolean, 可選)：強制關閉選單

### handleFormSubmit(event)
- **功能**：處理早鳥報名表單提交
- **參數**：
  - `event`：表單提交事件
- **功能**：
  - 驗證表單數據
  - 發送 POST 請求到 `/api/register` API
  - 顯示成功或錯誤訊息
  - 重置表單（成功時）
  - 處理載入狀態和錯誤處理

### 滾動監聽
- 自動監聽頁面滾動事件
- 當滾動超過 50px 時改變導航欄樣式（添加背景和陰影）

## 回傳值說明

### 組件回傳
- 返回一個完整的 React 組件，包含所有頁面區塊
- 無需額外參數即可渲染完整頁面

## API 端點說明

### POST /api/register
處理報名表單提交

**請求格式**：
```json
{
  "name": "張三",
  "phone": "0912345678",
  "email": "example@email.com",
  "message": "我想了解更多資訊"
}
```

**回應格式（成功）**：
```json
{
  "success": true,
  "message": "報名成功！我們會盡快與您聯繫。",
  "id": 1
}
```

**回應格式（失敗）**：
```json
{
  "success": false,
  "error": "錯誤訊息"
}
```

### GET /admin/registrations
查看所有報名資料（需要 Basic Auth）

**認證**：
- 帳號：`admin`
- 密碼：`admin123`

**回應**：HTML 頁面（包含所有報名資料的表格）

## 資料庫結構

### registrations 表
| 欄位 | 類型 | 說明 |
|------|------|------|
| id | INTEGER | 主鍵，自動遞增 |
| name | TEXT | 姓名（必填） |
| phone | TEXT | 電話（必填） |
| email | TEXT | 電子郵件（必填） |
| message | TEXT | 備註（選填） |
| created_at | DATETIME | 建立時間（自動） |

## 注意事項

1. **圖片資源**：
   - 導師照片使用 `WhatsApp Image 2025-12-01 at 23.00.31.jpeg`
   - 確保圖片文件與 `index.html` 在同一目錄
   - 如需更換圖片，請更新 `<img>` 標籤的 `src` 屬性

2. **表單提交**：
   - ✅ 已連接 Cloudflare Workers 後端 API
   - 表單資料會儲存到 D1 資料庫
   - 包含完整的錯誤處理和驗證

3. **Cloudflare 部署**：
   - **前端**：可部署到 Cloudflare Pages（靜態網站）
   - **後端**：部署到 Cloudflare Workers
   - **資料庫**：使用 Cloudflare D1
   - 確保在 `wrangler.toml` 中正確配置 D1 binding

4. **安全性**：
   - 管理後台使用 Basic Auth 保護
   - 建議在生產環境更改預設帳號密碼（在 `wrangler.toml` 的環境變數中）
   - API 端點包含 CORS 設定（生產環境建議限制特定域名）

5. **SEO 優化**：
   - 頁面已包含隱藏的 SEO 內容（使用 `sr-only` 和 `hidden` 類）
   - 包含完整的 meta 標籤
   - 適合搜索引擎索引

## 未來改進方向

1. ✅ 添加實際的報名表單（已完成）
2. ✅ 添加真實的圖片資源（已完成）
3. ✅ 連接 Cloudflare Workers 處理表單提交（已完成）
4. ✅ 添加表單數據驗證和錯誤處理（已完成）
5. ✅ 建立管理後台查看報名資料（已完成）
6. 優化移動端體驗
7. 添加多語言支持
8. 添加 Google Analytics 或其他分析工具
9. 優化 SEO（添加結構化數據 Schema.org）
10. 添加表單提交後的郵件通知功能
11. 添加報名資料匯出功能（CSV/Excel）
12. 添加報名資料搜尋和篩選功能

## 維護記錄

- 2024年：修復導師名稱顯示問題，將「您的名字」改為「LOBO LAU」
- 2024年：修復無效的圖片 URL，使用 CSS 漸變和圖標替代
- 2024年：將 React 組件轉換為純靜態 HTML，適配 Cloudflare Pages 部署
- 2024年：添加早鳥報名表單功能
- 2024年：更新導師照片為實際圖片
- 2024年12月：建立 Cloudflare Workers + Hono + D1 後端系統
- 2024年12月：連接前端表單到後端 API
- 2024年12月：建立管理後台查看報名資料

詳細修復記錄請參考 `fixbug.md` 文件。

## 常用指令

```bash
# 開發
npm run dev                    # 啟動本地開發服務器

# 資料庫操作
npm run db:create             # 建立 D1 資料庫
npm run db:migrate            # 執行資料庫遷移（生產環境）
npm run db:migrate:local      # 執行資料庫遷移（本地環境）
npm run db:query "SELECT * FROM registrations"  # 查詢資料庫

# 部署
npm run deploy                # 部署到 Cloudflare Workers
```

## 疑難排解

### 問題：無法連接到 API
- 確認 Workers 已正確部署
- 檢查 `wrangler.toml` 中的配置
- 確認 API URL 是否正確

### 問題：資料庫查詢失敗
- 確認 D1 資料庫已建立
- 確認已執行資料庫遷移（`npm run db:migrate`）
- 檢查 `wrangler.toml` 中的 `database_id` 是否正確

### 問題：管理後台無法訪問
- 確認 Basic Auth 帳號密碼正確（預設：admin / admin123）
- 檢查瀏覽器是否支援 Basic Auth
- 確認環境變數已正確設置

