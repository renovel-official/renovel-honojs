import { jsxRenderer } from 'hono/jsx-renderer';
import { getSession } from '@/libs/session';
import { getCookie } from 'hono/cookie';
import { Context } from 'hono';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Env from '@/interfaces/utils/env';

export const MainLayout = jsxRenderer(async ({ children }, c: Context<Env>) => {
  const db = c.get('db');
  const token = getCookie(c, 's-token') ?? "";
  const session = await getSession(db, token);
  const login = session ? true : false;
  const title = c.get('title') || "ReNovel | 学生運営の小説投稿サイト";

  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{ title }</title>
        <meta property="og:title" content="ReNovel - 小説投稿サイト" />
        <meta property="og:description" content="あなたの小説を世界に発信しよう" />
        <meta property="og:image" content="/renovel-logo.png" />
        <meta property="og:type" content="website" />
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="icon" href="/renovel-logo.png" type="image/png" />
      </head>
      <body class={`bg-gray-100 text-gray-800`}>
        { /** ヘッダー */ }
        <Header login={login} />

        { /** メイン画面 */ }
        <div class="container mx-auto px-4 py-6">
          { children }
        </div>

        { /** フッター */ }
        <Footer />
      </body>
    </html>
  )
})
