import { Context } from "hono";
import Register from "@/app/register";
import Env from "@/interfaces/utils/env";

export default async function registerHandler(c: Context<Env>) {
    const error = c.req.query('error');
    c.set('title', '新規登録 | ReNovel')

    return c.render(<Register error={error} />);
}