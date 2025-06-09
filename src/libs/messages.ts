import { rooms, roomUsers, messages } from "@/db/d1";
import { Message, Room, RoomUser, RoomResult } from "@/interfaces/messages";
import { DrizzleD1Database } from "drizzle-orm/d1";
import { getUser } from "./user";
import { Context } from "hono";
import { eq, asc } from "drizzle-orm";
import Env from "@/interfaces/utils/env";

async function getRooms(db: DrizzleD1Database, userId: string): Promise<Array<RoomResult>> {
    const getResult = await db.select().from(roomUsers).orderBy(asc(roomUsers.id)).where(eq(roomUsers.user_id, userId)).execute();
    const rooms = [];

    for (const roomUser of getResult) {
        const room = await getRoomDetails(db, roomUser.room_id ?? "");

        if (room) {
            rooms.push(room);
        }
    }

    return rooms;
}

async function getRoom(db: DrizzleD1Database, roomId: string): Promise<Room | null> {
    const getResult = await db.select().from(rooms).orderBy(asc(rooms.id)).where(eq(rooms.slug, roomId)).execute();

    if (getResult.length === 0) {
        return null;
    }

    const room = getResult[0];

    return {
        id: room.id,
        slug: room.slug ?? "",
        title: room.title ?? "",
        created_at: room.created_at ?? "",
    }
}

async function getRoomUsers(db: DrizzleD1Database, roomId: string): Promise<Array<RoomUser>> {
    const getResult = await db.select().from(roomUsers).orderBy(asc(roomUsers.id)).where(eq(roomUsers.room_id, roomId)).execute();

    return getResult.map((roomUser) => ({
        id: roomUser.id,
        room_id: roomUser.room_id ?? "",
        user_id: roomUser.user_id ?? "",
        is_admin: roomUser.is_admin ? true : false,
        created_at: roomUser.created_at ?? "",
    }));
}

async function getRoomMessages(db: DrizzleD1Database, roomId: string): Promise<Array<Message>> {
    const roomResult = await getRoom(db, roomId);

    if (!roomResult) {
        return [];
    }

    const messagesResult = await db.select().from(messages).orderBy(asc(messages.id)).where(eq(messages.room_id, roomId)).execute();

    return messagesResult.map((message) => ({
        id: message.id,
        room_id: message.room_id ?? "",
        slug: message.slug ?? "",
        author_id: message.author_id ?? "",
        text: message.text ?? "",
        created_at: message.created_at ?? "",
    }));
}


async function getRoomDetails(db: DrizzleD1Database, roomId: string): Promise<RoomResult | null> {
    const room = await getRoom(db, roomId);

    if (!room) {
        return null;
    }


    const users = await getRoomUsers(db, roomId);
    const messages = await getRoomMessages(db, roomId);

    return {
        room,
        users,
        messages
    }
}

export { getRooms, getRoomUsers };