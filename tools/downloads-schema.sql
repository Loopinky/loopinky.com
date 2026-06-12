CREATE TABLE IF NOT EXISTS downloads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL,
  lang TEXT NOT NULL DEFAULT '',
  freebie TEXT NOT NULL DEFAULT '',
  download TEXT NOT NULL DEFAULT '',
  source TEXT NOT NULL DEFAULT '',
  page TEXT NOT NULL DEFAULT '',
  user_agent TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_downloads_created_at ON downloads(created_at);
CREATE INDEX IF NOT EXISTS idx_downloads_email ON downloads(email);
