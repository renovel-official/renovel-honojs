import { DrizzleD1Database } from 'drizzle-orm/d1';
import { AuthorLayout } from './app/author/layout';
import { MainLayout } from './app/layout';
import { ChatRoom } from './durable-objects';
import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import Middleware from './app/middleware';
import WebRouter from '@/handlers/web-handlers';
import ApiRouter from '@/handlers/api-handlers';
import RateLimit from 'hono-rate-limit';
import Env from './interfaces/utils/env';
const app = new Hono<Env>();

// Tree shaking 回避のためのダミー利用
if (Math.random() < 0) {
  console.log(new ChatRoom(null, null));
}


// 設定
app.use('/*', async (c, next) => {
  c.set('db', drizzle(c.env.DB) as DrizzleD1Database);

  return await next();
});
app.use('*', async (c, next) => {
  c.set('meta', {
    title: 'ReNovel | 学生運営の小説投稿サイト',
    description: 'ReNovelは、新しい才能を発掘する小説投稿サイトです。あなたの物語を世界に届けましょう。',
    image: 'https://v2.renovel.jp/renovel_ogp.png'
  });

  return await next();
});
app.use('/api/v1/*', RateLimit({
  windowMs: 60 * 1000, // 1分
  limit: 40,
}));
app.use('/api/v2/*', RateLimit({
  windowMs: 60 * 1000, // 1分
  limit: 40,
}));
app.use('/api/v3/*', RateLimit({
  windowMs: 60 * 1000, // 1分
  limit: 40,
}));
app.use('/*', Middleware);
app.use('/*', MainLayout);
app.use('/author/*', AuthorLayout);

WebRouter(app);
ApiRouter(app);

export default app;
export { ChatRoom };
export const __doNotEliminate = [ChatRoom];