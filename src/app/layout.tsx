import { jsxRenderer } from 'hono/jsx-renderer';
import { getSession } from '@/libs/session';
import { getCookie } from 'hono/cookie';
import { Context } from 'hono';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Head from '@/components/layout/head';
import Env from '@/interfaces/utils/env';

export const MainLayout = jsxRenderer(async ({ children }, c: Context<Env>) => {
  const db = c.get('db');
  const token = getCookie(c, 's-token') ?? "";
  const session = await getSession(db, token);
  const login = session ? true : false;
  const uri = new URL(c.req.url);
  const host = uri.origin;
  const { title, description, image } = c.get('meta');

  return (
    <html>
      <Head host={host} title={title} description={description} image={image} />
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
