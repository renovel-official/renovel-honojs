import { DrizzleD1Database } from "drizzle-orm/d1";
import { getSession } from "@/libs/session";
import { getCookie } from "hono/cookie";
import { Context } from "hono";
import { getUser } from "@/libs/user";


import Env from "@/interfaces/utils/env";


export async function sessionHandler(c: Context<Env>) {
    const token = getCookie(c, 's-token') ?? c.req.query('token');

    if (!token) {
        return c.json({ success: false, message: 'Token is required' }, 401);
    }

    const db: DrizzleD1Database = c.get('db');
    
    const session = await getSession(db, token);
    const user = await getUser(db, session?.email ?? null);
    delete user?.password;

    return c.json({ success: true, message: 'Session is valid', data: { user } });
}
