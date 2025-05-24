CREATE TABLE accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT,
  name TEXT,
  email TEXT,
  password TEXT,
  description TEXT,
  google_client_id TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  role TEXT DEFAULT 'user'
);

CREATE TABLE author_novels (
  id INTEGER PRIMARY KEY,
  email TEXT,
  novel_id TEXT,
  is_admin INTEGER, -- booleanはSQLiteではINTEGERで0/1を使う
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE episodes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  novel_id TEXT NOT NULL,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  good INTEGER NOT NULL DEFAULT 0,
  view INTEGER NOT NULL DEFAULT 0,
  public_date INTEGER NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE follow_novels (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author_id TEXT NOT NULL,
  novel_id TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE follow_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE novels (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT '名称未設定',
  phrase TEXT NOT NULL,
  point INTEGER NOT NULL DEFAULT 0,
  description TEXT NOT NULL,
  genre TEXT NOT NULL,
  tags TEXT, -- JSON文字列として保存
  text TEXT,
  is_public INTEGER NOT NULL DEFAULT 1, -- booleanは0/1
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE point_user (
  id INTEGER PRIMARY KEY,
  email TEXT,
  novel_id TEXT,
  point INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token TEXT,
  email TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
