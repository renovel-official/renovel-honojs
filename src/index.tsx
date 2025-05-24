import { DrizzleD1Database } from 'drizzle-orm/d1';
import { MainLayout } from './app/layout';
import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import Home from './app';
import Env from './interfaces/utils/env';

const app = new Hono<Env>();

// 設定
app.use('/*', async (c, next) => {
  c.set('db', drizzle(c.env.DB) as DrizzleD1Database);

  return await next();
});

// テンプレート
app.use('/*', MainLayout);

// Webルーティング
app.get('/', );

app.get('/works/:workId', );
app.get('/works/:workId/episodes/:episodeId', );

app.get('/search', );
app.get('/ranking', );
app.get('/new', );
app.get('/blog', );
app.get('/contact', );
app.get('/terms', );
app.get('/privacy', );
app.get('/help', );
app.get('/about', );
app.get('/help', );

// クライアントAPIルーティング
app.get('/api/v1/login', );
app.get('/api/v1/register', );
app.get('/api/v1/logout', );

app.get('/api/v2/works', );
app.get('/api/v2/works/:workId', );
app.get('/api/v2/works/:workId/good', )
app.get('/api/v2/works/:workId/episodes/:episodeId', );
app.get('/api/v2/works/:workId/episodes/:episodeId/good', );
app.get('/api/v2/works/:workId/episodes/:episodeId/comments', );
app.get('/api/v2/works/:workId/episodes/:episodeId/comments/:commentId', );

app.get('/api/v3/search', );
app.get('/api/v3/ranking', );
app.get('/api/v3/blog', );

app.get('/api/utils/placeholder/:workId', );
app.get('/api/utils/placeholder/:workId/:width/:height', );


// 管理APIルーティング
app.get('/api/admin/login', );
app.get('/api/admin/logout', );
app.get('/api/admin/works', );
app.get('/api/admin/works/:workId', );
app.get('/api/admin/works/:workId/episodes/:episodeId', );
app.get('/api/admin/blogs', );


export default app;