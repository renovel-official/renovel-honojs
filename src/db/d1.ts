import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';

// accountsテーブル
export const accounts = sqliteTable('accounts', {
  id: integer('id').primaryKey(),
  slug: text('slug'),
  name: text('name'),
  email: text('email'),
  password: text('password'),
  description: text('description'),
  google_client_id: text('google_client_id'),
  created_at: integer('created_at'),
  role: text('role').default('user'),
});

// author_novelsテーブル
export const authorNovels = sqliteTable('author_novels', {
  id: integer('id').primaryKey(),
  email: text('email'),
  novel_id: text('novel_id'),
  is_admin: integer('is_admin'), // 0 or 1
  created_at: integer('created_at'),
});

// episodesテーブル
export const episodes = sqliteTable('episodes', {
  id: integer('id').primaryKey(),
  novel_id: text('novel_id').notNull(),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  text: text('text').notNull(),
  good: integer('good').notNull().default(0),
  view: integer('view').notNull().default(0),
  public_date: integer('public_date').notNull(),
  created_at: integer('created_at'),
  updated_at: text('updated_at'),
});

// follow_novelsテーブル
export const followNovels = sqliteTable('follow_novels', {
  id: integer('id').primaryKey(),
  author_id: text('author_id').notNull(),
  novel_id: text('novel_id').notNull(),
  created_at: integer('created_at'),
});

// follow_usersテーブル
export const followUsers = sqliteTable('follow_users', {
  id: integer('id').primaryKey(),
  author_id: text('author_id').notNull(),
  user_id: text('user_id').notNull(),
  created_at: integer('created_at'),
});

// novelsテーブル
export const novels = sqliteTable('novels', {
  id: integer('id').primaryKey(),
  slug: text('slug').notNull(),
  type: text('type').notNull(),
  title: text('title').notNull().default('名称未設定'),
  phrase: text('phrase').notNull(),
  point: integer('point').notNull().default(0),
  description: text('description').notNull(),
  genre: text('genre').notNull(),
  tags: text('tags'), // JSON文字列として保存
  text: text('text'),
  is_public: integer('is_public').notNull().default(1),
  created_at: integer('created_at'),
  updated_at: text('updated_at'),
});

// point_userテーブル
export const pointUser = sqliteTable('point_user', {
  id: integer('id').primaryKey(),
  email: text('email'),
  novel_id: text('novel_id'),
  point: integer('point').default(1),
  created_at: integer('created_at'),
});

// sessionsテーブル
export const sessions = sqliteTable('sessions', {
  id: integer('id').primaryKey(),
  token: text('token'),
  email: text('email'),
  created_at: integer('created_at'),
});