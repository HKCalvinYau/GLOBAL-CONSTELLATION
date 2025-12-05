# Keystatic 故障排除指南

## 🔍 當前狀態檢查

### 1. 檢查開發伺服器是否運行

```bash
# 檢查端口 4321 是否被占用
lsof -ti:4321

# 如果沒有輸出，表示伺服器未運行
```

### 2. 啟動開發伺服器

```bash
# 進入專案目錄
cd "/Users/calvinyau/Documents/Calvin Project/GLOBAL CONSELL"

# 啟動 Astro 開發伺服器
npm run dev
```

**預期輸出**：
```
  astro  v4.x.x ready in xxx ms

  ➜  Local:   http://localhost:4321/
  ➜  Network: use --host to expose
```

---

## ✅ 已修復的問題

### 1. 修復了 `keystatic.config.ts`

- ✅ 改用 `import.meta.env` 替代 `process.env`
- ✅ 添加了本地存儲作為預設（無需 GitHub 配置即可測試）
- ✅ 修復了 reader 的創建邏輯

### 2. 修復了 `src/pages/keystatic/[...params].astro`

- ✅ 修正了導入語句（使用 `default` 導出）

---

## 🚀 快速修復步驟

### 步驟 1：確認依賴已安裝

```bash
npm install
```

### 步驟 2：確認目錄結構

```bash
mkdir -p src/content/posts public/images/posts
```

### 步驟 3：啟動開發伺服器

```bash
npm run dev
```

### 步驟 4：訪問 Keystatic

在瀏覽器中打開：
- http://localhost:4321/keystatic

---

## 🐛 常見錯誤及解決方法

### 錯誤 1：`Cannot GET /keystatic`

**原因**：開發伺服器未運行或路由未正確配置

**解決方案**：
1. 確認 `npm run dev` 正在運行
2. 確認 `astro.config.mjs` 中 `output: 'hybrid'`
3. 確認 `src/pages/keystatic/[...params].astro` 存在

### 錯誤 2：`Module not found: @keystatic/astro`

**解決方案**：
```bash
npm install @keystatic/astro @keystatic/core
```

### 錯誤 3：`process is not defined`

**原因**：在瀏覽器環境中使用了 Node.js API

**狀態**：✅ 已修復 - 已改用 `import.meta.env`

### 錯誤 4：空白頁面或 404

**可能原因**：
- Keystatic 配置錯誤
- 存儲配置不正確

**解決方案**：
1. 檢查 `keystatic.config.ts` 是否正確
2. 如果使用 GitHub 存儲，確認 `.env` 文件存在
3. 如果使用本地存儲，確認目錄權限正確

---

## 📝 測試清單

- [ ] 開發伺服器正在運行（`npm run dev`）
- [ ] 可以訪問首頁（http://localhost:4321）
- [ ] `keystatic.config.ts` 配置正確
- [ ] `src/pages/keystatic/[...params].astro` 存在
- [ ] `astro.config.mjs` 中 `output: 'hybrid'`
- [ ] 依賴已安裝（`npm install`）
- [ ] 目錄結構正確（`src/content/posts` 存在）

---

## 🔧 完整重置步驟

如果以上方法都不行，嘗試完整重置：

```bash
# 1. 停止開發伺服器（Ctrl+C）

# 2. 清除 node_modules 和鎖定文件
rm -rf node_modules package-lock.json

# 3. 重新安裝依賴
npm install

# 4. 確認配置
cat keystatic.config.ts
cat astro.config.mjs

# 5. 建立目錄
mkdir -p src/content/posts public/images/posts

# 6. 重新啟動
npm run dev
```

---

## 📞 獲取更多幫助

如果問題仍然存在，請提供以下信息：

1. **終端機輸出**：執行 `npm run dev` 時的完整輸出
2. **瀏覽器錯誤**：打開開發者工具（F12），查看 Console 和 Network 標籤
3. **配置文件**：`keystatic.config.ts` 和 `astro.config.mjs` 的內容

