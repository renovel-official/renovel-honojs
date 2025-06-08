import { rooms, roomUsers, messages } from "@/db/d1";
import { Message, Room, RoomUser, RoomResult } from "@/interfaces/messages";
import { DrizzleD1Database } from "drizzle-orm/d1";
import { getUser } from "./user";
import { Context } from "hono";
import { eq, or } from "drizzle-orm";
import Env from "@/interfaces/utils/env";

async function getRooms(db: DrizzleD1Database, userId: string): Promise<Array<Room>> {
    const getResult = await db.select().from(rooms).where(eq(roomUsers.user_id, userId)).execute();

    return getResult.map((room) => ({
        id: room.id,
        slug: room.slug ?? "",
        title: room.title ?? "",
        created_at: room.created_at ?? "",
    }));
}

async function getRoomUsers(db: DrizzleD1Database, roomId: string): Promise<Array<RoomUser>> {
    const getResult = await db.select().from(roomUsers).where(eq(roomUsers.room_id, roomId)).execute();

    return getResult.map((roomUser) => ({
        id: roomUser.id,
        room_id: roomUser.room_id ?? "",
        user_id: roomUser.user_id ?? "",
        is_admin: roomUser.is_admin ? true : false,
        created_at: roomUser.created_at ?? "",
    }));
}

async function getRoom(db: DrizzleD1Database, roomId: string): Promise<RoomResult> {
    const roomResult = await db.select().from(rooms).where(eq(rooms.slug, roomId)).execute();
    const roomUsersResult = await db.select().from(roomUsers).where(eq(roomUsers.room_id, roomResult[0].id)).execute();
}

export { getRooms };