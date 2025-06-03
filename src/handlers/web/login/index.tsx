import { Context } from "hono";
import Login from "@/app/login";
import Env from "@/interfaces/utils/env";

export default async function LoginHandler(c: Context<Env>) {
    const error = c.req.query('error');
    c.set('title', 'ログイン | ReNovel')

    return c.render(<Login error={error} />);
}