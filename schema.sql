-- GLOBAL CONSTELLATION 課程報名系統資料庫 Schema
-- 建立報名資料表

CREATE TABLE IF NOT EXISTS registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 建立索引以優化查詢效能
CREATE INDEX IF NOT EXISTS idx_created_at ON registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_email ON registrations(email);

