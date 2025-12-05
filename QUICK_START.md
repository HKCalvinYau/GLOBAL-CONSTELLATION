# 🚀 Astro 專案快速啟動指令

## 一鍵初始化（複製貼上執行）

```bash
# 進入專案目錄
cd "/Users/calvinyau/Documents/Calvin Project/GLOBAL CONSELL"

# 使用合併配置（包含 Astro + Cloudflare Workers）
cp package-merged.json package.json

# 安裝所有依賴
npm install

# 安裝 Tailwind CSS 整合
npx astro add tailwind --yes

# 建立必要目錄
mkdir -p src/content/posts public/images/posts public

# 啟動開發伺服器
npm run dev
```

## 📍 訪問地址

啟動成功後，訪問：
- 🌐 **首頁**：http://localhost:4321
- 📝 **部落格**：http://localhost:4321/blog
- 🔧 **Keystatic 後台**：http://localhost:4321/keystatic

---

## 📦 安裝依賴詳解

### 1. 初始化 Astro 專案

```bash
# 使用合併配置（推薦）
cp package-merged.json package.json

# 或僅使用 Astro（不使用 Workers）
cp astro-package.json package.json
```

### 2. 安裝所有依賴

```bash
npm install
```

這會安裝：
- ✅ Astro 框架
- ✅ Tailwind CSS
- ✅ Keystatic CMS
- ✅ Cloudflare 適配器
- ✅ TypeScript 支援

### 3. 安裝 Tailwind CSS 整合

```bash
npx astro add tailwind --yes
```

選項說明：
- `--yes`：自動確認所有提示

### 4. 安裝 Keystatic CMS（如果尚未安裝）

```bash
npm install @keystatic/astro @keystatic/core
```

---

## 🎯 啟動開發伺服器

### Astro 開發模式（前端）

```bash
npm run dev
```

- 端口：4321（預設）
- 熱重載：✅ 自動
- 訪問：http://localhost:4321

### Cloudflare Workers 開發模式（後端 API）

```bash
npm run dev:workers
```

- 端口：8787（預設）
- API 端點：http://localhost:8787/api/register
- 管理後台：http://localhost:8787/admin/registrations

---

## 🔧 常用指令

```bash
# 開發
npm run dev              # 啟動 Astro 開發伺服器
npm run dev:workers      # 啟動 Workers 開發伺服器

# 建置
npm run build            # 建置生產版本
npm run preview          # 預覽建置結果

# 資料庫（Workers）
npm run db:create        # 建立 D1 資料庫
npm run db:migrate       # 執行資料庫遷移（生產）
npm run db:migrate:local # 執行資料庫遷移（本地）

# 部署
npm run deploy           # 部署到 Cloudflare Workers
```

---

## ⚠️ 常見問題

### 端口被占用

```bash
# Astro 會自動使用下一個可用端口
# 或手動指定：
npm run dev -- --port 3000
```

### 模組找不到

```bash
# 重新安裝依賴
npm install

# 或清除快取後重新安裝
rm -rf node_modules package-lock.json
npm install
```

### Tailwind 樣式不生效

```bash
# 確認 Tailwind 已正確安裝
npx astro add tailwind --yes

# 檢查配置
cat tailwind.config.mjs
```

---

## 📚 詳細文檔

- 完整設置指南：`SETUP_ASTRO.md`
- 專案說明：`README.md`
- 部署指南：`DEPLOYMENT.md`

