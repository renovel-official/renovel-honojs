import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';

// usersテーブル
const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  slug: text('slug').notNull(),
  name: text('name'),
  email: text('email'),
  password: text('password'),
  description: text('description'),
  google_client_id: text('google_client_id'),
  created_at: text('created_at'),
  role: text('role').default('user'),
});

// author_novelsテーブル
const authorNovels = sqliteTable('author_novels', {
  id: integer('id').primaryKey(),
  email: text('email'),
  novel_id: text('novel_id'),
  is_admin: integer('is_admin'), // 0 or 1
  created_at: integer('created_at'),
});

// episodesテーブル
const episodes = sqliteTable('episodes', {
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
const followNovels = sqliteTable('follow_novels', {
  id: integer('id').primaryKey(),
  author_id: text('author_id').notNull(),
  novel_id: text('novel_id').notNull(),
  created_at: integer('created_at'),
});

// follow_usersテーブル
const followUsers = sqliteTable('follow_users', {
  id: integer('id').primaryKey(),
  author_id: text('author_id').notNull(),
  user_id: text('user_id').notNull(),
  created_at: integer('created_at'),
});

// novelsテーブル
const novels = sqliteTable('novels', {
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
const pointUser = sqliteTable('point_user', {
  id: integer('id').primaryKey(),
  email: text('email'),
  novel_id: text('novel_id'),
  point: integer('point').default(1),
  created_at: integer('created_at'),
});

// sessionsテーブル
const sessions = sqliteTable('sessions', {
  id: integer('id').primaryKey(),
  token: text('token'),
  email: text('email'),
  created_at: text('created_at'),
  last_logined_at: integer('last_logined_at')
});

// messagesテーブル
const messages = sqliteTable('messages', {
  id: integer('id').primaryKey(),
  room_id: text('room_id'),
  slug: text('slug'),
  author_id: text('author_id'),
  text: text('text'),
  created_at: text('created_at'),
});

// roomsテーブル
const rooms = sqliteTable('rooms', {
  id: integer('id').primaryKey(),
  slug: text('slug'),
  title: text('title'),
  created_at: text('created_at'),
});

// room_usersテーブル
const roomUsers = sqliteTable('room_users', {
  id: integer('id').primaryKey(),
  room_id: text('room_id'),
  user_id: text('user_id'),
  is_admin: integer('is_admin'),
  created_at: text('created_at'),
});

export { 
  users, 
  authorNovels, 
  episodes, 
  followNovels, 
  followUsers, 
  novels, 
  pointUser, 
  sessions, 
  messages, 
  rooms, 
  roomUsers 
};