import { getSession } from "@/libs/session";
import { getCookie } from "hono/cookie";
import { Context } from "hono";
import { Next } from "hono";
import Env from "@/interfaces/utils/env";
import { getUser } from "@/libs/user";

const need_login = ["/author", ]
const disable_login = ["/login", "/register"];

export default async function Middleware(c: Context<Env>, next: Next) {
    const db = c.get('db');
    const token = getCookie(c, 's-token') ?? "";
    const session = await getSession(db, token);
    const user = await getUser(db, session?.email ?? "");
    const pathname = c.req.path;
    c.set('user', user);

    if (need_login.includes(pathname)) {
        if (!session) {
            return c.redirect('/login');
        }
    }
    if (disable_login.includes(pathname)) {
        if (session) {
            return c.redirect('/');
        }
    }
    
    await next();
}