# Cloudflare Pages 環境變數快速設置

## 🚀 一鍵複製設置

以下是您需要在 Cloudflare Pages 中設置的環境變數：

### 環境變數列表

```
KEYSTATIC_GITHUB_OWNER=HKCalvinYau
KEYSTATIC_GITHUB_REPO=GLOBAL-CONSTELLATION
```

### 設置步驟

1. **登入 Cloudflare Dashboard**
   - 訪問：https://dash.cloudflare.com/
   - 選擇您的帳號

2. **進入 Pages 設置**
   - 點擊左側 **Pages**
   - 選擇您的專案（或創建新專案）

3. **添加環境變數**
   - 點擊 **Settings** 標籤
   - 滾動到 **Environment variables** 部分
   - 點擊 **Add variable**

4. **添加第一個變數**
   - **Variable name**: `KEYSTATIC_GITHUB_OWNER`
   - **Value**: `HKCalvinYau`
   - **Environment**: 選擇 **All environments**（Production、Preview、Development）
   - 點擊 **Save**

5. **添加第二個變數**
   - **Variable name**: `KEYSTATIC_GITHUB_REPO`
   - **Value**: `GLOBAL-CONSTELLATION`
   - **Environment**: 選擇 **All environments**
   - 點擊 **Save**

6. **重新部署**
   - 點擊 **Deployments** 標籤
   - 找到最新的部署
   - 點擊 **Retry deployment** 或推送新代碼觸發部署

### 如果需要 Token（私有倉庫）

如果您的倉庫是私有的，還需要添加：

```
KEYSTATIC_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**獲取 Token：**
1. 訪問：https://github.com/settings/tokens
2. 點擊 **Generate new token (classic)**
3. 設置：
   - Note: `Keystatic CMS Access`
   - 勾選 `repo` 權限
4. 生成並複製 token
5. 添加到 Cloudflare Pages 環境變數

### 驗證設置

設置完成後，訪問：
- `https://your-domain.pages.dev/keystatic`

如果設置正確，您應該能夠：
- ✅ 訪問 Keystatic 後台
- ✅ 創建和編輯內容
- ✅ 內容會自動保存到 GitHub 倉庫

---

**提示：** 設置環境變數後，需要重新部署才能生效。

