import { Context } from "hono";
import Register from "@/app/register";
import Env from "@/interfaces/utils/env";

export default async function registerHandler(c: Context<Env>) {
    const error = c.req.query('error');
    c.set('meta', {
        title: '新規登録 | ReNovel',
        description: 'ReNovelへ新規登録しますか？',
        image: 'https://v2.renovel.jp/renovel_ogp.png'
    });

    return c.render(<Register error={error} />);
}