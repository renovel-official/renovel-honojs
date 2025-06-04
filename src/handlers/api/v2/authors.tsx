import { DrizzleD1Database } from "drizzle-orm/d1";
import { getUsers } from "@/libs/user";
import { Context } from "hono";
import Env from "@/interfaces/utils/env";

async function authorsHandler(c: Context<Env>) {
    const limit = parseInt(c.req.query('limit') ?? "0");
    const db: DrizzleD1Database = c.get('db');
    try {
        const users = await getUsers(db);

        if (limit === 0) {
            return c.json({ success: true, message: 'Success to get all users', data: { users } })
        } else {
            return c.json({ success: true, message: 'Success' });
        }
    } catch (e) {
        return c.json({ success: false, message: "Internal Error", data: e }, { status: 400 });
    }
    
}