import { DrizzleD1Database } from "drizzle-orm/d1";
import { createRoom } from "@/libs/messages";
import { Context } from "hono";
import Env from "@/interfaces/utils/env";

async function createRoomHandler(c: Context<Env>) {
    const db: DrizzleD1Database = c.get('db');
    const adminId = c.get('user')?.slug;

    if (!adminId) {
        return c.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { users, title } = await c.req.json();
    users.push(adminId);

    const result = await createRoom(db, adminId, users, title);

    if (!result) {
        return c.json({ success: false, message: "Failed to create room" }, { status: 400 });
    }

    const { room } = result;

    return c.json({ success: true, message: "Success to create room", data: { room } });
}

export { createRoomHandler };