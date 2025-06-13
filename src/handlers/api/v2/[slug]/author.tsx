import { DrizzleD1Database } from "drizzle-orm/d1";
import { getUser } from "@/libs/user";
import { Context } from "hono";
import Env from "@/interfaces/utils/env";

async function authorHandler(c: Context<Env>) {
    const userId = c.req.param('userId');
    const db: DrizzleD1Database = c.get('db');

    const user = await getUser(db, null, userId);

    if (!user) {
        return c.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    delete user.password;

    return c.json({ success: true, message: 'Success', data: { user } });
}

export { authorHandler };