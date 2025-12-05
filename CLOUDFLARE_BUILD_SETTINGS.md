# Cloudflare Pages 構建設置 - 正確配置

## ✅ 環境變數（正確）

您已經正確設置了：
- `KEYSTATIC_GITHUB_OWNER` = `HKCalvinYau` ✅
- `KEYSTATIC_GITHUB_REPO` = `GLOBAL-CONSTELLATION` ✅

## ❌ 構建設置需要修正

目前您的設置是 Next.js 的配置，但這個專案是 **Astro** 專案，需要更改：

### 需要修改的設置

1. **Framework preset（框架預設）**
   - ❌ 目前：`Next.js`
   - ✅ 應該：選擇 `Astro` 或 `None`

2. **Build command（構建命令）**
   - ❌ 目前：`npx @cloudflare/next-on-pages@1`
   - ✅ 應該：`npm run build`

3. **Build output directory（構建輸出目錄）**
   - ❌ 目前：`/ .vercel/output/static`
   - ✅ 應該：`dist`

### 正確的構建設置

```
Framework preset: Astro (或 None)
Build command: npm run build
Build output directory: dist
Root directory: (留空或 /)
```

## 📝 修改步驟

1. **更改 Framework preset**
   - 點擊下拉選單
   - 選擇 `Astro`（如果有的話）
   - 如果沒有 Astro 選項，選擇 `None`

2. **更改 Build command**
   - 清空現有內容
   - 輸入：`npm run build`

3. **更改 Build output directory**
   - 清空現有內容
   - 輸入：`dist`

4. **保存設置**
   - 點擊 `Save and Deploy` 按鈕

## 🔍 驗證

設置完成後，構建應該會：
- ✅ 使用正確的 Astro 構建命令
- ✅ 輸出到 `dist` 目錄
- ✅ 環境變數正確傳遞
- ✅ 成功部署

---

**注意：** 如果選擇 `None` 作為框架預設，您需要手動設置所有構建選項。

