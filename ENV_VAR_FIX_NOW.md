# 🔴 緊急修復：環境變數未設置

## ✅ 問題確認

測試頁面顯示：
- ❌ `KEYSTATIC_GITHUB_OWNER` 未設置
- ❌ `KEYSTATIC_GITHUB_REPO` 未設置
- ⚠️ `KEYSTATIC_GITHUB_TOKEN` 未設置

**這就是為什麼 Keystatic 無法工作的原因！**

## 🚀 立即修復步驟

### 步驟 1：登入 Cloudflare Dashboard

1. 訪問：https://dash.cloudflare.com/
2. 選擇您的帳號
3. 進入 **Pages** → 選擇 `global-constellation` 專案

### 步驟 2：設置環境變數

1. 點擊 **Settings** 標籤
2. 滾動到 **Environment variables** 部分
3. 點擊 **Add variable**

#### 添加第一個環境變數：

- **Variable name**：`KEYSTATIC_GITHUB_OWNER`
- **Value**：`HKCalvinYau`
- **Environment**：**必須選擇 "All environments"**（Production、Preview、Development）
- 點擊 **Save**

#### 添加第二個環境變數：

- **Variable name**：`KEYSTATIC_GITHUB_REPO`
- **Value**：`GLOBAL-CONSTELLATION`
- **Environment**：**必須選擇 "All environments"**
- 點擊 **Save**

#### 如果需要 Token（如果倉庫是私有的）：

- **Variable name**：`KEYSTATIC_GITHUB_TOKEN`
- **Value**：`ghp_siy0o0NCKAJ0PFlm0HD83r010PJlfM28EAzV`（您的 token）
- **Environment**：**必須選擇 "All environments"**
- 點擊 **Save**

### 步驟 3：重新部署

**非常重要**：設置環境變數後，必須重新部署！

1. 點擊 **Deployments** 標籤
2. 找到最新的部署
3. 點擊 **Retry deployment** 按鈕
4. 等待部署完成（約 2-3 分鐘）

### 步驟 4：驗證

部署完成後：

1. **訪問測試頁面**：`https://global-constellation.pages.dev/keystatic-test`
2. **應該看到**：
   - ✅ `KEYSTATIC_GITHUB_OWNER: ✅ 已設置: HKCalvinYau`
   - ✅ `KEYSTATIC_GITHUB_REPO: ✅ 已設置: GLOBAL-CONSTELLATION`
   - ✅ `KEYSTATIC_GITHUB_TOKEN: ✅ 已設置`（如果設置了）

3. **訪問 Keystatic 後台**：`https://global-constellation.pages.dev/keystatic`
4. **應該看到**：Keystatic 後台界面

## ⚠️ 重要提醒

### 必須選擇 "All environments"

如果只選擇了 "Production"，環境變數不會傳遞到運行時！

**正確設置**：
- ✅ 選擇 **All environments**（Production、Preview、Development）

**錯誤設置**：
- ❌ 只選擇 Production
- ❌ 只選擇 Preview
- ❌ 只選擇 Development

### 必須重新部署

設置環境變數後，**必須重新部署**才能生效！

## 📋 檢查清單

設置完成後，確認：

- [ ] `KEYSTATIC_GITHUB_OWNER` 已設置 = `HKCalvinYau`
- [ ] `KEYSTATIC_GITHUB_REPO` 已設置 = `GLOBAL-CONSTELLATION`
- [ ] 兩個變數都選擇了 **All environments**
- [ ] 如果倉庫是私有的，已設置 `KEYSTATIC_GITHUB_TOKEN`
- [ ] 已點擊 **Retry deployment** 重新部署
- [ ] 部署已完成
- [ ] 測試頁面顯示環境變數已設置

## 🎯 完成後

設置完成並重新部署後：

1. 訪問 `/keystatic-test` 應該顯示 ✅ 已設置
2. 訪問 `/keystatic` 應該顯示 Keystatic 後台

---

**現在請按照上述步驟設置環境變數並重新部署！**

