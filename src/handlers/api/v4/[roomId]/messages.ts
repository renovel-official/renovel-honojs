import { getRoomDetails, createMessage } from "@/libs/messages";
import { DrizzleD1Database } from "drizzle-orm/d1";
import { getUnixTimestamp } from "@/utils/timestamp";
import { Context } from "hono";
import Env from "@/interfaces/utils/env";

async function postMessagesHandler(c: Context<Env>) {
    const db = c.get('db');
    const user = c.get('user');

    if (!user) {
        return c.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const roomId = c.req.param('roomId');
    const { content } = await c.req.json();

    const result = await createMessage(db, roomId, user.slug, content);

    if (!result) {
        return c.json({ success: false, message: "Failed to create message" }, { status: 400 });
    }

    return c.json({ success: true, message: "Success to create message", data: { message: result } });
}

async function getMessagesHandler(c: Context<Env>) {
    const db = c.get('db');
    const user = c.get('user');

    if (!user) {
        return c.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const roomId = c.req.param('roomId');
    const lastDate = c.req.query('last_date') ? parseInt(c.req.query('last_date') ?? "0") : undefined;

    const result = await getRoomDetails(db, roomId, lastDate);

    if (!result) {
        return c.json({ success: false, message: "Failed to get room details" }, { status: 400 });
    }

    return c.json({ success: true, message: "Success to get room details", data: { ...result } });
}

export { postMessagesHandler, getMessagesHandler };