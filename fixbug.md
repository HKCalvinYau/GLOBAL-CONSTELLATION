# Bug 修復記錄

## 修復日期：2024年

### 已修復的問題

#### 1. 修改導師名稱 ✅
- **問題描述**：頁面中顯示「Dr. [您的名字] 老師」，需要改為實際姓名
- **位置**：index.html 第 267 行
- **修復方法**：將「[您的名字]」替換為「LOBO LAU」
- **修復狀態**：✅ 成功修復
- **修復時間**：2024年

#### 2. 無效的圖片 URL - 用戶頭像 ✅
- **問題描述**：使用了 `/api/placeholder/32/32?text=U${i}` 這個不存在的 API 端點
- **位置**：index.html 第 129 行
- **修復方法**：使用 CSS 漸變背景和文字顯示替代圖片，顯示用戶編號
- **修復狀態**：✅ 成功修復
- **修復時間**：2024年

#### 3. 無效的圖片 URL - 家族排列場域圖片 ✅
- **問題描述**：使用了 `/api/placeholder/400/400` 這個不存在的 API 端點
- **位置**：index.html 第 143 行
- **修復方法**：使用 CSS 漸變背景和圖標（Users icon）替代圖片，保持視覺效果
- **修復狀態**：✅ 成功修復
- **修復時間**：2024年

#### 4. 無效的圖片 URL - 導師照片 ✅
- **問題描述**：使用了 `http://googleusercontent.com/image_generation_content/0` 這個無效的圖片 URL
- **位置**：index.html 第 259 行
- **修復方法**：使用 CSS 漸變背景和圖標（Users icon）替代圖片，顯示導師名稱和職稱
- **修復狀態**：✅ 成功修復
- **修復時間**：2024年

#### 5. 轉換為靜態網站 ✅
- **問題描述**：原本是 React 組件代碼，但需要部署到 Cloudflare（靜態網站）
- **位置**：整個 index.html 文件
- **修復方法**：
  - 將 React 組件轉換為純 HTML
  - 使用 Tailwind CSS CDN 替代本地樣式
  - 使用原生 JavaScript 實現 React 功能（useState, useEffect）
  - 將所有 Lucide React 圖標轉換為 SVG
- **修復狀態**：✅ 成功修復
- **修復時間**：2024年

#### 6. 添加早鳥報名表格 ✅
- **問題描述**：需要添加早鳥報名表單功能
- **位置**：index.html 報名區塊（offer section）
- **修復方法**：
  - 在報名區塊中添加完整的表單
  - 包含姓名、電話、電子郵件、備註等欄位
  - 添加表單驗證和提交處理函數
  - 使用原生 JavaScript 處理表單提交
- **修復狀態**：✅ 成功修復
- **修復時間**：2024年

#### 7. 更新導師照片 ✅
- **問題描述**：需要將導師照片替換為實際圖片
- **位置**：index.html 導師介紹區塊（instructor section）
- **修復方法**：將 CSS 漸變背景替換為實際圖片 `WhatsApp Image 2025-12-01 at 23.00.31.jpeg`
- **修復狀態**：✅ 成功修復
- **修復時間**：2024年

#### 8. 修復圖片路徑空格問題導致瀏覽器無法打開 ✅
- **問題描述**：圖片文件名包含空格（`WhatsApp Image 2025-12-01 at 23.00.31.jpeg`），導致瀏覽器在使用 file:// 協議時無法正確載入圖片
- **位置**：index.html 第 271 行
- **修復方法**：將圖片路徑中的空格進行 URL 編碼，改為 `WhatsApp%20Image%202025-12-01%20at%2023.00.31.jpeg`
- **修復狀態**：✅ 成功修復
- **修復時間**：2024年12月

#### 9. 修復 Keystatic 後台 "No matching renderer found" 錯誤 ✅
- **問題描述**：訪問 http://localhost:4321/keystatic 時顯示 "No matching renderer found for the .js file extension" 錯誤
- **位置**：Keystatic CMS 後台
- **原因**：Keystatic 的 UI 基於 React，但 Astro 專案中沒有安裝 React 整合
- **修復方法**：
  1. 執行 `npx astro add react --yes` 添加 React 整合
  2. 自動安裝 `@astrojs/react`、`react`、`react-dom` 等套件
  3. 更新 `astro.config.mjs` 添加 `react()` 整合
  4. 重新啟動開發伺服器
- **修復狀態**：✅ 成功修復
- **修復時間**：2024年12月4日
- **測試結果**：✅ Keystatic 後台正常運行，可以管理文章內容

#### 10. 部落格功能優化：移除 SLUG 欄位，添加閱讀量、TAG、分類 ✅
- **問題描述**：用戶要求移除部落格文章的 SLUG 欄位（不在編輯界面顯示），並添加閱讀量、TAG、分類三個新元素，同時 TAG 和分類需要有管理功能（新增、修改、刪除）
- **位置**：`keystatic.config.ts`、`src/pages/blog/index.astro`、`src/pages/blog/[slug].astro`
- **修復方法**：
  1. 移除文章 schema 中的 `slug` 欄位（保留 `slugField: 'title'` 用於自動生成 URL）
  2. 添加 `views` 欄位（整數類型，預設為 0）
  3. 建立 `tags` collection（標籤管理集合）
  4. 建立 `categories` collection（分類管理集合）
  5. 在文章 schema 中添加 `tags` 欄位（多選，關聯到 tags collection）
  6. 在文章 schema 中添加 `category` 欄位（單選，關聯到 categories collection）
  7. 更新部落格列表頁和文章內頁，顯示閱讀量、標籤和分類
  8. 建立 `src/content/tags` 和 `src/content/categories` 目錄
- **修復狀態**：✅ 成功修復
- **修復時間**：2024年12月
- **功能說明**：
  - 標籤和分類可在 Keystatic 後台獨立管理（新增、編輯、刪除）
  - 分類支援自訂顏色代碼
  - 文章可選擇多個標籤和一個分類
  - 閱讀量顯示在文章列表和內頁
  - SLUG 自動從標題生成，不在編輯界面顯示

#### 11. 導師介紹區塊改為兩個欄位佈局 ✅
- **問題描述**：用戶需要將導師介紹區塊改為兩個欄位（COLUMN）佈局，因為將來會有兩個老師
- **位置**：`src/pages/index.astro` 導師介紹區塊
- **修復方法**：
  1. 將單一導師的佈局改為兩個欄位的網格佈局（`grid grid-cols-1 md:grid-cols-2`）
  2. 每個欄位包含完整的導師資訊（照片、姓名、引言、介紹、認證標籤）
  3. 保持響應式設計（手機版垂直排列，桌面版兩個欄位並排）
  4. 添加第二個導師的預留位置（包含佔位圖片和文字）
  5. 保持現有的樣式和格式
- **修復狀態**：✅ 成功修復
- **修復時間**：2024年12月
- **功能說明**：
  - 桌面版：兩個導師並排顯示（各佔50%寬度）
  - 手機版：兩個導師垂直排列
  - 第一個導師：Dr. LOBO LAU（完整資訊）
  - 第二個導師：預留位置，待添加內容

#### 12. 添加 David Lau 導師資料 ✅
- **問題描述**：用戶要求添加第二個導師 David Lau 的完整資料
- **位置**：`src/pages/index.astro` 導師介紹區塊（第二個導師欄位）
- **修復方法**：
  1. 更新導師姓名：David Lau 老師
  2. 添加職稱：NGH 催眠治療師 / 頌缽治療師 / Amar 主理人
  3. 添加引言：「解開潛意識的結，找回關係中的愛。」
  4. 添加完整介紹內容（三個段落）：
     - 自 2022 年起投身療癒領域的經歷
     - 諮詢室的工作方式和擅長領域
     - Amar 品牌故事
  5. 添加認證標籤：NGH 催眠治療師、頌缽音療、Amar 主理人
  6. 保持照片佔位符（待用戶提供實際照片）
- **修復狀態**：✅ 成功修復
- **修復時間**：2024年12月
- **功能說明**：
  - 導師姓名和職稱清晰顯示
  - 品牌故事以特殊樣式突出顯示（使用 indigo-600 顏色）
  - 三個認證標籤並排顯示
  - 照片位置保留佔位符，待用戶提供實際照片後可替換

#### 13. 更新兩位導師的照片 ✅
- **問題描述**：用戶要求更新兩位導師的照片
- **位置**：`src/pages/index.astro` 導師介紹區塊
- **修復方法**：
  1. 將第一個導師（Dr. LOBO LAU）的照片從 `/WhatsApp Image 2025-12-01 at 23.00.31.jpeg` 更新為 `/lobo_lau.jpeg`
  2. 將第二個導師（David Lau）的佔位符替換為實際的 `<img>` 標籤，使用 `/david_leung.jpeg`
  3. 保持相同的樣式和過渡效果（hover:scale-[1.01] transition duration-500）
  4. 保持相同的陰影效果和佈局結構
- **修復狀態**：✅ 成功修復
- **修復時間**：2024年12月
- **功能說明**：
  - 兩個導師的照片都已正確顯示
  - 照片路徑使用 public 目錄下的文件（`/lobo_lau.jpeg` 和 `/david_leung.jpeg`）
  - 照片保持相同的視覺效果和響應式設計

#### 14. 首頁添加學員見證和 BLOG 兩個 SECTION ✅
- **問題描述**：用戶要求在首頁加入兩個新的 SECTION：學員見證和 BLOG
- **位置**：`src/pages/index.astro`
- **修復方法**：
  1. 在 frontmatter 中導入 `reader` 並獲取最新的部落格文章（最多 6 篇）
  2. 處理文章資料，讀取標籤和分類的完整資訊
  3. 按發布日期排序（最新的在前）
  4. 在導師介紹 SECTION 之後添加「學員見證」SECTION（id="testimonials"）
     - 包含標題、描述和三個見證卡片
     - 每個卡片包含 5 星評級、見證文字、學員姓名和參與時間
  5. 添加「BLOG」SECTION（id="blog"）
     - 顯示最新的 6 篇部落格文章
     - 每篇文章顯示封面圖片、標題、發布日期、閱讀量、分類、標籤、摘要
     - 包含「查看所有文章」按鈕連結到完整部落格頁面
     - 如果沒有文章，顯示提示訊息和連結到 Keystatic 後台
  6. 更新導航欄（桌面版和手機版），添加「部落格」按鈕
- **修復狀態**：✅ 成功修復
- **修復時間**：2024年12月
- **功能說明**：
  - 學員見證 SECTION：三個見證卡片並排顯示，響應式設計（手機版垂直排列）
  - BLOG SECTION：自動從 Keystatic 獲取最新文章，顯示在首頁
  - 兩個 SECTION 都保持與現有設計一致的樣式
  - 導航欄已更新，可以快速跳轉到這兩個 SECTION

#### 15. 檢查導航欄連結並添加相片庫 SECTION ✅
- **問題描述**：
  1. 用戶要求檢查 HEADER MENU 的連結，移除沒有用的連結
  2. 添加一個 PHOTO GALLERY SECTION
- **位置**：`src/pages/index.astro` 導航欄和相片庫區塊
- **修復方法**：
  1. **檢查導航欄連結**：
     - 生命卡點 → `#problem` ✓ 有效
     - 系統原理 → `#method` ✓ 有效
     - 導師介紹 → `#instructor` ✓ 有效
     - 學員見證 → `#testimonials` ✓ 有效
     - 部落格 → `#blog` ✓ 有效
     - 立即報名 → `#offer` ✓ 有效
     - **結果**：所有連結都是有效的，無需移除
  2. **添加相片庫 SECTION**：
     - 在 BLOG SECTION 之後添加「相片庫」SECTION（id="gallery"）
     - 使用網格佈局（Grid Layout）：響應式設計，桌面版 4 欄，平板 3 欄，手機 2 欄
     - 實現燈箱（Lightbox）效果：
       - 點擊相片可放大查看
       - 支援左右箭頭切換相片
       - 支援 ESC 鍵關閉
       - 點擊背景關閉
       - 防止背景滾動
     - 相片懸停效果：放大和顯示搜尋圖標
     - 目前包含 2 張實際相片（導師照片）和 10 個佔位符
  3. **更新導航欄**：
     - 桌面版和手機版都添加「相片庫」按鈕
     - 連結到 `#gallery` SECTION
- **修復狀態**：✅ 成功修復
- **修復時間**：2024年12月
- **功能說明**：
  - 相片庫使用網格佈局，整齊排列
  - 點擊相片可放大查看（燈箱效果）
  - 支援鍵盤操作（ESC 關閉，左右箭頭切換）
  - 響應式設計，適配各種螢幕尺寸
  - 相片懸停時有視覺反饋（放大和圖標顯示）

#### 16. 調整相片庫為 4x2 佈局並添加「了解更多」按鈕 ✅
- **問題描述**：用戶要求將相片庫改為 4x2 佈局（4 欄 x 2 行，共 8 張相片），並在底部添加「了解更多」按鈕
- **位置**：`src/pages/index.astro` 相片庫區塊
- **修復方法**：
  1. 將相片數量從 12 張（2 張實際 + 10 個佔位符）改為 8 張（2 張實際 + 6 個佔位符）
  2. 調整網格佈局為 `grid-cols-2 md:grid-cols-4`（手機版 2 欄，桌面版 4 欄）
  3. 添加最大寬度 `max-w-6xl mx-auto` 讓佈局更集中和美觀
  4. 在相片庫底部添加「了解更多」按鈕，連結到報名表單 SECTION（`#offer`）
  5. 按鈕樣式與其他 CTA 按鈕保持一致（indigo-900 背景，白色文字，懸停效果）
- **修復狀態**：✅ 成功修復
- **修復時間**：2024年12月
- **功能說明**：
  - 相片庫現在顯示為 4x2 佈局（桌面版 4 欄，手機版 2 欄）
  - 共 8 張相片（2 張實際相片 + 6 個佔位符）
  - 底部「了解更多」按鈕可平滑滾動到報名表單 SECTION
  - 保持響應式設計和燈箱功能

#### 17. 將網站公司名稱改為 AMAR ✅
- **問題描述**：用戶要求將網站的公司名稱改為 AMAR，並更新 HEADER 和 FOOTER
- **位置**：`src/pages/index.astro`、`src/pages/blog/index.astro`、`src/pages/blog/[slug].astro`
- **修復方法**：
  1. **首頁 (index.astro)**：
     - HEADER：將 "GLOBAL CONSTELLATION" 改為 "AMAR"
     - FOOTER：將 "GLOBAL CONSTELLATION" 改為 "AMAR"
     - 版權聲明：將 "© 2024 Global Family Constellation" 改為 "© 2024 AMAR"
  2. **部落格列表頁 (blog/index.astro)**：
     - 頁面標題：將 "部落格 | GLOBAL CONSTELLATION" 改為 "部落格 | AMAR"
     - HEADER：將 "GLOBAL CONSTELLATION" 改為 "AMAR"
     - FOOTER：將 "© 2024 Global Family Constellation" 改為 "© 2024 AMAR"
  3. **部落格文章頁 (blog/[slug].astro)**：
     - 頁面標題：將 "${post.entry.title} | GLOBAL CONSTELLATION" 改為 "${post.entry.title} | AMAR"
     - HEADER：將 "GLOBAL CONSTELLATION" 改為 "AMAR"
     - FOOTER：將 "© 2024 Global Family Constellation" 改為 "© 2024 AMAR"
- **修復狀態**：✅ 成功修復
- **修復時間**：2024年12月
- **功能說明**：
  - 所有頁面的 HEADER 和 FOOTER 都已更新為 AMAR
  - 頁面標題（title）也已更新
  - 版權聲明統一為 "© 2024 AMAR. All rights reserved."

#### 18. 全面功能改進：修復導航連結、改進部落格、創建相片庫和學員見證頁面、擴展後台管理 ✅
- **問題描述**：用戶要求多項功能改進
  1. 修復 HEADER MENU 連結（沒反應）
  2. 部落格頁：添加 FILTER、分類、相片預覽、推介👍、閱讀量
  3. 相片庫獨立頁面：不規則風格、最多16張、分頁
  4. 學員見證獨立頁面：像BLOG、3-4欄卡片
  5. 後台管理：相片庫和學員見證管理
- **位置**：多個文件
- **修復方法**：
  1. **修復 HEADER MENU 連結**：
     - 添加 `is:inline` 標籤確保腳本正確執行
     - 改進 `scrollToSection` 函數，計算導航欄高度調整滾動位置
     - 將「部落格」、「相片庫」、「學員見證」改為外部連結（`/blog`, `/gallery`, `/testimonials`）
  2. **改進部落格頁面**：
     - 添加 FILTER 過濾器（按分類和標籤）
     - 添加推介👍圖標顯示（在封面圖片上）
     - 保持相片預覽、分類、閱讀量顯示
     - 添加過濾功能的 JavaScript
  3. **創建相片庫獨立頁面** (`src/pages/gallery.astro`)：
     - 使用 Masonry 不規則網格佈局
     - 最多顯示16張相片
     - 實現分頁功能（每頁8張）
     - 保持燈箱功能
  4. **創建學員見證獨立頁面** (`src/pages/testimonials.astro`)：
     - 3-4欄卡片佈局（響應式）
     - 顯示評分（5星）
     - 顯示學員姓名、日期、見證內容
  5. **擴展 Keystatic 配置**：
     - 添加 `gallery` 集合（相片庫管理）
       - 標題、相片、排序（01, 02格式）、描述
     - 添加 `testimonials` 集合（學員見證管理）
       - 姓名、發布日期、相片、摘要、評分、排序、內容
     - 在 `posts` 集合中添加 `featured` 欄位（推介標記）
- **修復狀態**：✅ 成功修復
- **修復時間**：2024年12月
- **功能說明**：
  - 所有導航連結現在都正常工作
  - 部落格頁面有完整的過濾功能
  - 相片庫和學員見證都有獨立的頁面和後台管理
  - 所有內容都可以通過 Keystatic 後台管理

#### 19. 修復導航欄重複連結和 JavaScript 錯誤 ✅
- **問題描述**：
  1. 首頁導航欄有重複的「學員見證」連結（一個是 `scrollToSection('testimonials')`，另一個是 `/testimonials`）
  2. 部落格頁面的 `filterPosts` 函數使用了未定義的 `event` 參數
  3. 相片庫頁面的 JavaScript 模板字符串語法錯誤
  4. 首頁相片庫燈箱功能缺少錯誤處理
- **位置**：`src/pages/index.astro`、`src/pages/blog/index.astro`、`src/pages/gallery.astro`
- **修復方法**：
  1. **修復導航欄重複連結**：
     - 移除重複的「學員見證」外部連結（`/testimonials`），保留 `scrollToSection('testimonials')` 用於首頁滾動
  2. **修復部落格過濾功能**：
     - 將 `onclick` 屬性改為使用 `data-filter-type` 和 `data-filter-value` 屬性
     - 使用 `DOMContentLoaded` 事件監聽器為所有過濾按鈕添加點擊事件
     - 移除對未定義 `event` 參數的依賴
  3. **修復相片庫 JavaScript**：
     - 修復模板字符串中的類型註解問題
  4. **改進相片庫燈箱功能**：
     - 添加空值檢查，防止元素未找到時出錯
     - 改進圖片切換邏輯，處理佔位符圖片的情況
     - 添加錯誤處理和回退機制
- **修復狀態**：✅ 成功修復
- **修復時間**：2024年12月
- **功能說明**：
  - 導航欄現在沒有重複連結
  - 部落格過濾功能現在使用更可靠的事件處理方式
  - 相片庫燈箱功能更加穩定，有完整的錯誤處理

#### 20. 修復 Astro 模板中的 JSX 語法錯誤 ✅
- **問題描述**：在 Astro 模板中使用了 JSX 的 `[...Array(n)].map()` 語法，這在 Astro 中無法正確工作，會導致瀏覽器渲染錯誤
- **位置**：
  1. `src/pages/index.astro` - 學員見證區塊（3處）
  2. `src/pages/index.astro` - 相片庫區塊（1處）
  3. `src/pages/testimonials.astro` - 評分顯示（1處）
  4. `src/pages/blog/[slug].astro` - 標籤顯示（1處）
  5. `src/pages/gallery.astro` - JavaScript 模板字符串語法錯誤
- **修復方法**：
  1. 將 `[...Array(n)].map()` 改為 `Array.from({ length: n }).map()`（Astro 兼容語法）
  2. 修復 `gallery.astro` 中的 JavaScript 變數傳遞問題：
     - 使用 `define:vars` 屬性將 Astro 變數傳遞給內聯腳本
     - 修復模板字符串語法錯誤
  3. 修復 `blog/[slug].astro` 中的 map 語法（移除不必要的括號）
- **修復狀態**：✅ 成功修復
- **修復時間**：2024年12月
- **功能說明**：
  - 所有頁面現在都能在瀏覽器中正確渲染
  - 學員見證的5星評級正確顯示
  - 相片庫的佔位符正確生成
  - 標籤和分類顯示正常
  - JavaScript 功能正常運作

#### 21. 修復 Cloudflare Pages 構建錯誤 ✅
- **問題描述**：在 Cloudflare Pages 構建時出現多個錯誤：
  1. `TEsting.mdoc` 文件包含不允許的 `slug` 欄位，且缺少必需的 `title` 欄位
  2. `qw.yaml` 分類文件的 `color` 值無效（值為 "v" 而不是有效的顏色代碼）
  3. `wvrer.mdoc` 文件缺少 `title` 欄位
  4. 多處代碼嘗試讀取 `undefined` 的屬性（`categoryData.entry.color`、`tag.entry.displayName` 等）
- **位置**：
  - `src/content/posts/TEsting.mdoc`
  - `src/content/posts/wvrer.mdoc`
  - `src/content/categories/qw.yaml`
  - `src/pages/index.astro`
  - `src/pages/blog/index.astro`
  - `src/pages/blog/[slug].astro`
- **修復方法**：
  1. 修復 `TEsting.mdoc`：移除 `slug` 欄位，添加 `title` 欄位和 `views` 欄位
  2. 修復 `wvrer.mdoc`：添加 `title` 欄位
  3. 修復 `qw.yaml`：添加 `displayName` 欄位，將 `color` 從 "v" 改為有效的顏色代碼 "#3B82F6"
  4. 在所有頁面中添加安全檢查（使用可選鏈操作符 `?.`）：
     - `post.categoryData?.entry?.displayName`
     - `post.categoryData.entry?.color`
     - `tag?.entry?.displayName`
  5. 改進分類和標籤讀取邏輯，添加空值檢查
- **修復狀態**：✅ 成功修復
- **修復時間**：2024年12月
- **測試結果**：✅ 構建成功，所有頁面正常生成

### 修復統計
- 總共修復：21 個問題
- 成功修復：21 個
- 待處理：0 個

