# Keystatic GitHub 存儲設置指南

本指南將幫助您設置 Keystatic 使用 GitHub 作為存儲後端，這樣您就可以在生產環境中管理內容。

---

## 📋 步驟 1：獲取 GitHub 倉庫信息

從您的 Git 遠程倉庫 URL 中提取信息：

**您的倉庫 URL：**
```
https://github.com/HKCalvinYau/GLOBAL-CONSTELLATION.git
```

**提取的信息：**
- **Owner（所有者）**：`HKCalvinYau`
- **Repo（倉庫名）**：`GLOBAL-CONSTELLATION`

---

## 🔑 步驟 2：創建 GitHub Personal Access Token（如果需要）

如果您的倉庫是私有的，或者需要寫入權限，需要創建 Personal Access Token：

### 2.1 創建 Token

1. 訪問 GitHub：https://github.com/settings/tokens
2. 點擊 **Generate new token** → **Generate new token (classic)**
3. 設置：
   - **Note**：`Keystatic CMS Access`
   - **Expiration**：選擇過期時間（建議選擇較長時間）
   - **Scopes（權限）**：
     - ✅ `repo`（完整倉庫訪問權限）
     - ✅ `workflow`（如果需要 GitHub Actions）
4. 點擊 **Generate token**
5. **重要**：立即複製 token（只會顯示一次！）
   - Token 格式：`ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 2.2 保存 Token

將 token 保存在安全的地方，稍後會用到。

---

## 💻 步驟 3：本地開發環境設置

### 3.1 創建 .env 文件

在專案根目錄創建 `.env` 文件：

```bash
# 在專案根目錄
touch .env
```

### 3.2 添加環境變數

編輯 `.env` 文件，添加以下內容：

```env
# Keystatic GitHub 存儲配置
KEYSTATIC_GITHUB_OWNER=HKCalvinYau
KEYSTATIC_GITHUB_REPO=GLOBAL-CONSTELLATION

# 如果需要訪問私有倉庫，添加 GitHub Token
# KEYSTATIC_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**注意：**
- 如果倉庫是公開的，通常不需要 `KEYSTATIC_GITHUB_TOKEN`
- 如果倉庫是私有的，必須設置 `KEYSTATIC_GITHUB_TOKEN`
- Token 應該保密，不要提交到 Git

### 3.3 更新 .gitignore

確保 `.env` 文件已在 `.gitignore` 中（應該已經有了）：

```gitignore
# Environment variables
.env
.env.local
```

### 3.4 測試本地設置

```bash
# 啟動開發服務器
npm run dev

# 訪問 Keystatic 後台
# http://localhost:4321/keystatic
```

如果設置正確，您應該能夠：
- 訪問 Keystatic 後台
- 創建和編輯內容
- 內容會保存到 GitHub 倉庫

---

## ☁️ 步驟 4：Cloudflare Pages 環境變數設置

### 4.1 登入 Cloudflare Dashboard

1. 訪問：https://dash.cloudflare.com/
2. 選擇您的帳號
3. 進入 **Pages** 部分

### 4.2 找到您的專案

1. 在 Pages 列表中，找到您的專案（或創建新專案）
2. 點擊專案名稱進入設置

### 4.3 設置環境變數

1. 點擊 **Settings** 標籤
2. 滾動到 **Environment variables** 部分
3. 點擊 **Add variable**

#### 添加第一個環境變數：

- **Variable name**：`KEYSTATIC_GITHUB_OWNER`
- **Value**：`HKCalvinYau`
- **Environment**：選擇所有環境（Production、Preview、Development）
- 點擊 **Save**

#### 添加第二個環境變數：

- **Variable name**：`KEYSTATIC_GITHUB_REPO`
- **Value**：`GLOBAL-CONSTELLATION`
- **Environment**：選擇所有環境
- 點擊 **Save**

#### 如果需要 Token（私有倉庫）：

- **Variable name**：`KEYSTATIC_GITHUB_TOKEN`
- **Value**：`ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`（您的 token）
- **Environment**：選擇所有環境
- 點擊 **Save**

### 4.4 重新部署

設置環境變數後，需要重新部署：

1. 點擊 **Deployments** 標籤
2. 找到最新的部署
3. 點擊 **Retry deployment** 或推送新的代碼

---

## 🔍 步驟 5：驗證設置

### 5.1 檢查環境變數

在 Cloudflare Pages 中，環境變數應該顯示為：

```
KEYSTATIC_GITHUB_OWNER = HKCalvinYau
KEYSTATIC_GITHUB_REPO = GLOBAL-CONSTELLATION
KEYSTATIC_GITHUB_TOKEN = ghp_... (如果設置)
```

### 5.2 測試功能

1. 訪問您的網站：`https://your-domain.pages.dev/keystatic`
2. 嘗試創建或編輯內容
3. 檢查 GitHub 倉庫，確認文件已更新

### 5.3 檢查 GitHub 倉庫

訪問您的 GitHub 倉庫：
```
https://github.com/HKCalvinYau/GLOBAL-CONSTELLATION
```

您應該能看到：
- `src/content/posts/` - 文章內容
- `src/content/tags/` - 標籤
- `src/content/categories/` - 分類
- `src/content/gallery/` - 相片庫
- `src/content/testimonials/` - 學員見證

---

## 🛠️ 故障排除

### 問題 1：無法訪問 Keystatic 後台

**可能原因：**
- 環境變數未設置
- 環境變數名稱錯誤
- 需要重新部署

**解決方法：**
1. 檢查環境變數是否正確設置
2. 確認變數名稱完全匹配（大小寫敏感）
3. 重新部署專案

### 問題 2：無法保存內容

**可能原因：**
- 缺少 GitHub Token（私有倉庫）
- Token 權限不足
- 倉庫權限問題

**解決方法：**
1. 確認已設置 `KEYSTATIC_GITHUB_TOKEN`
2. 檢查 Token 是否有 `repo` 權限
3. 確認 Token 未過期

### 問題 3：構建時無法讀取內容

**可能原因：**
- 構建時環境變數未設置
- GitHub API 限制

**解決方法：**
1. 在 Cloudflare Pages 設置中確認環境變數已設置
2. 檢查構建日誌中的錯誤訊息
3. 如果使用 GitHub Actions，也需要設置環境變數

---

## 📝 重要提醒

### 安全性

1. **不要提交 Token 到 Git**
   - Token 應該只在 `.env` 文件中（已在 `.gitignore` 中）
   - 在 Cloudflare Pages 中使用環境變數設置

2. **定期更新 Token**
   - 如果 Token 洩露，立即撤銷並創建新的
   - 定期檢查 Token 的訪問記錄

3. **最小權限原則**
   - 只授予必要的權限（`repo` 權限通常足夠）

### 備份

1. **GitHub 本身就是備份**
   - 所有內容都保存在 GitHub 倉庫中
   - 可以通過 Git 歷史恢復

2. **定期檢查**
   - 定期檢查 GitHub 倉庫中的內容
   - 確認所有更改都已同步

---

## 🔄 切換回本地存儲

如果您想暫時使用本地存儲（例如開發時），只需：

1. **移除環境變數**：
   - 刪除 `.env` 文件中的相關變數
   - 或重命名為 `.env.local`（不會被 Git 追蹤）

2. **重新啟動開發服務器**：
   ```bash
   npm run dev
   ```

Keystatic 會自動切換到本地存儲模式。

---

## 📚 相關文檔

- [Keystatic 官方文檔](https://keystatic.com/docs)
- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [Cloudflare Pages 環境變數](https://developers.cloudflare.com/pages/platform/build-configuration/#environment-variables)

---

**最後更新：2024年12月**

