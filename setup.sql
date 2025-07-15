CREATE TABLE IF NOT EXISTS users (
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

CREATE TABLE IF NOT EXISTS novels (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT '名称未設定',
  phrase TEXT NOT NULL,
  description TEXT NOT NULL,
  genre TEXT NOT NULL,
  tags TEXT, -- JSON文字列として保存
  text TEXT,
  created_at INTEGER DEFAULT (datetime('now')),
  updated_at INTEGER DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS author_novels (
  id INTEGER PRIMARY KEY,
  slug TEXT,
  novel_id TEXT,
  is_admin INTEGER, -- booleanはSQLiteではINTEGERで0/1を使う
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS episodes (
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

CREATE TABLE IF NOT EXISTS episode_comments (
  id INTEGER PRIMARY KEY,
  comment_id TEXT,
  author_id TEXT,
  work_id TEXT,
  episode_id TEXT,

  text_id TEXT,

  created_at INTEGER
);

CREATE TABLE IF NOT EXISTS follow_novels (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author_id TEXT NOT NULL,
  novel_id TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS follow_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS point_user (
  id INTEGER PRIMARY KEY,
  email TEXT,
  novel_id TEXT,
  point INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token TEXT,
  email TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  last_logined_at INTEGER
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  room_id TEXT,
  slug TEXT,
  author_id TEXT,
  text TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS rooms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT,
  title TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS room_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  room_id TEXT,
  user_id TEXT,
  is_admin INTEGER, -- booleanはSQLiteではINTEGERで0/1を使う
  created_at TEXT DEFAULT (datetime('now'))
);