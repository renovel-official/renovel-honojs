import { Context } from "hono";
import Login from "@/app/login";
import Env from "@/interfaces/utils/env";

export default async function loginHandler(c: Context<Env>) {
    const error = c.req.query('error');
    c.set('meta', {
        title: 'ログイン | ReNovel',
        description: 'ReNovelへログインしますか？',
        image: 'https://v2.renovel.jp/renovel_ogp.png'
    });

    return c.render(<Login error={error} />);
}