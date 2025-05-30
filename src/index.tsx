import { DrizzleD1Database } from 'drizzle-orm/d1';
import { MainLayout } from './app/layout';
import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import WebRouter from "@/handlers/web-handlers";
import ApiRouter from "@/handlers/api-handlers";
import Env from './interfaces/utils/env';

const app = new Hono<Env>();

// 設定
app.use('/*', async (c, next) => {
  c.set('db', drizzle(c.env.DB) as DrizzleD1Database);

  return await next();
});

// テンプレート
app.use('/*', MainLayout);

WebRouter(app);
ApiRouter(app);

export default app;