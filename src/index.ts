import { Hono } from 'hono';
import { basicAuth } from 'hono/basic-auth';

// 定義環境變數類型
interface Env {
  DB: D1Database;
  ADMIN_USERNAME: string;
  ADMIN_PASSWORD: string;
}

// 定義報名資料類型
interface Registration {
  id?: number;
  name: string;
  phone: string;
  email: string;
  message?: string;
  created_at?: string;
}

// 建立 Hono 應用
const app = new Hono<{ Bindings: Env }>();

// 中間件：CORS 設定（允許前端請求）
app.use('*', async (c, next) => {
  // 允許所有來源（生產環境建議限制特定域名）
  c.header('Access-Control-Allow-Origin', '*');
  c.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (c.req.method === 'OPTIONS') {
    return c.text('', 204);
  }
  
  await next();
});

// API 路由：處理報名表單提交
app.post('/api/register', async (c) => {
  try {
    const body = await c.req.json<Registration>();
    
    // 驗證必填欄位
    if (!body.name || !body.phone || !body.email) {
      return c.json(
        { 
          success: false, 
          error: '缺少必填欄位：姓名、電話和電子郵件都是必填的' 
        },
        400
      );
    }

    // 驗證電子郵件格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return c.json(
        { 
          success: false, 
          error: '電子郵件格式不正確' 
        },
        400
      );
    }

    // 寫入資料庫
    const result = await c.env.DB.prepare(
      `INSERT INTO registrations (name, phone, email, message) 
       VALUES (?, ?, ?, ?)`
    )
    .bind(body.name, body.phone, body.email, body.message || null)
    .run();

    if (result.success) {
      return c.json({
        success: true,
        message: '報名成功！我們會盡快與您聯繫。',
        id: result.meta.last_row_id
      }, 201);
    } else {
      return c.json(
        { 
          success: false, 
          error: '資料庫寫入失敗' 
        },
        500
      );
    }
  } catch (error) {
    console.error('報名處理錯誤:', error);
    return c.json(
      { 
        success: false, 
        error: '伺服器錯誤，請稍後再試' 
      },
      500
    );
  }
});

// 管理後台：查看所有報名資料（需要 Basic Auth）
app.get('/admin/registrations', basicAuth({
  username: 'admin',
  password: 'admin123',
}), async (c) => {
  try {
    // 從資料庫讀取所有報名資料（按時間倒序）
    const { results } = await c.env.DB.prepare(
      `SELECT id, name, phone, email, message, created_at 
       FROM registrations 
       ORDER BY created_at DESC`
    ).all<Registration>();

    // 計算總數
    const total = results?.length || 0;

    // 生成 HTML 頁面
    const html = `
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>報名管理後台 - GLOBAL CONSTELLATION</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
  </style>
</head>
<body class="bg-slate-50 min-h-screen py-8">
  <div class="container mx-auto px-4 max-w-7xl">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-slate-900">報名管理後台</h1>
        <div class="text-sm text-slate-600">
          總共 <span class="font-bold text-indigo-600">${total}</span> 筆報名
        </div>
      </div>

      ${total === 0 ? `
        <div class="text-center py-12">
          <svg class="w-16 h-16 mx-auto text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
          </svg>
          <p class="text-slate-500 text-lg">目前尚無報名資料</p>
        </div>
      ` : `
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200">
            <thead class="bg-slate-100">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">姓名</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">電話</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">電子郵件</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">備註</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">報名時間</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-slate-200">
              ${results?.map((reg) => `
                <tr class="hover:bg-slate-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">#${reg.id}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium">${escapeHtml(reg.name)}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">${escapeHtml(reg.phone)}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    <a href="mailto:${escapeHtml(reg.email)}" class="text-indigo-600 hover:text-indigo-800">
                      ${escapeHtml(reg.email)}
                    </a>
                  </td>
                  <td class="px-6 py-4 text-sm text-slate-600 max-w-xs">
                    ${reg.message ? `<div class="truncate" title="${escapeHtml(reg.message)}">${escapeHtml(reg.message)}</div>` : '<span class="text-slate-400">-</span>'}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    ${formatDateTime(reg.created_at || '')}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}
    </div>
  </div>
</body>
</html>
    `;

    return c.html(html);
  } catch (error) {
    console.error('讀取報名資料錯誤:', error);
    return c.html(`
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>錯誤 - GLOBAL CONSTELLATION</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 min-h-screen flex items-center justify-center">
  <div class="bg-white rounded-lg shadow-lg p-8 max-w-md">
    <h1 class="text-2xl font-bold text-red-600 mb-4">發生錯誤</h1>
    <p class="text-slate-600">無法讀取報名資料，請稍後再試。</p>
  </div>
</body>
</html>
    `, 500);
  }
});

// 工具函數：轉義 HTML（防止 XSS）
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// 工具函數：格式化日期時間
function formatDateTime(dateString: string): string {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  } catch {
    return dateString;
  }
}

// 導出應用
export default app;

