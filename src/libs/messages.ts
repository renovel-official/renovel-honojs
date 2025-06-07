import { rooms, roomUsers, messages } from "@/db/d1";
import { Message, Room, RoomUser } from "@/interfaces/messages";
import { DrizzleD1Database } from "drizzle-orm/d1";
import { getUser } from "./user";
import { Context } from "hono";
import { eq, or } from "drizzle-orm";
import Env from "@/interfaces/utils/env";

export async function getRooms(db: DrizzleD1Database, userId: string): Promise<Array<Room>> {
    const getResult = await db.select().from(rooms).where(eq(roomUsers.user_id, userId)).execute();

    return getResult.map((room) => ({
        id: room.id,
        slug: room.slug ?? "",
        title: room.title ?? "",
        created_at: room.created_at ?? "",
    }));
}

