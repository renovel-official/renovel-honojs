import { Message, Room, RoomUser, RoomResult } from "@/interfaces/messages";
import { rooms, roomUsers, messages } from "@/db/d1";
import { getUnixTimestamp, formatJST } from "@/utils/timestamp";
import { DrizzleD1Database } from "drizzle-orm/d1";
import { bin2hex } from "@/utils/bin2hex";
import { eq, asc, and, gt } from "drizzle-orm";

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
        is_admin: roomUser.is_admin ?? 0,
        created_at: roomUser.created_at ?? "",
    }));
}

async function getRoomMessages(
    db: DrizzleD1Database,
    roomId: string,
    lastDate?: number
): Promise<Array<Message>> {
    const roomResult = await getRoom(db, roomId);

    if (!roomResult) {
        return [];
    }

    // SQLレベルで created_at によるフィルタを追加
    const whereClause = lastDate
        ? and(eq(messages.room_id, roomId), gt(messages.created_at, lastDate.toString()))
        : eq(messages.room_id, roomId);

    const messagesResult = await db
        .select()
        .from(messages)
        .where(whereClause)
        .orderBy(asc(messages.created_at)) // id順ではなく、created_at順に
        .execute();

    return messagesResult.map((message) => ({
        id: message.id,
        room_id: message.room_id ?? "",
        slug: message.slug ?? "",
        author_id: message.author_id ?? "",
        text: message.text ?? "",
        created_at: message.created_at ?? "",
    }));
}

async function getRoomDetails(db: DrizzleD1Database, roomId: string, lastDate?: number): Promise<RoomResult | null> {
    const room = await getRoom(db, roomId);

    if (!room) {
        return null;
    }

    const users = await getRoomUsers(db, roomId);
    const messages = await getRoomMessages(db, roomId, lastDate);

    return {
        room,
        users,
        messages
    }
}

async function createRoom(db: DrizzleD1Database, adminId: string, users: string[], title: string): Promise<RoomResult | null> {
    const roomId: string = bin2hex(16);
    const insertedUsers: string[] = [];
    const createdAt = getUnixTimestamp();

    const room = await db.insert(rooms).values({
        slug: roomId,
        title: title,
        created_at: createdAt.toString(),
    }).returning().execute();

    if (room.length === 0) {
        return null;
    }

    const membersInsertData = users.map((userId) => {
        if (!insertedUsers.includes(userId)) {
            insertedUsers.push(userId);

            return {
                room_id: roomId,
                user_id: userId,
                is_admin: userId === adminId ? 1 : 0,
                created_at: createdAt.toString(),
            }
        }

        return null;
    }).filter((data) => data !== null);

    const result = await db.insert(roomUsers).values(membersInsertData).returning().execute();

    if (result.length === 0) {
        return null;
    }

    return {
        room: {
            id: room[0].id,
            slug: roomId,
            title: title,
            created_at: formatJST(createdAt),
        },
        users: result.map((roomUser) => ({
            id: roomUser.id,
            room_id: roomUser.room_id ?? "",
            user_id: roomUser.user_id ?? "",
            is_admin: roomUser.is_admin ?? 0,
            created_at: roomUser.created_at ?? "",
        })),
        messages: [],
    }
}

async function updateRoom(db: DrizzleD1Database, roomId: string, data: Record<string, any>): Promise<Room | null> {
    const result = await db.update(rooms).set(data).where(eq(rooms.slug, roomId)).returning().execute();
    
    if (result.length === 0) {
        return null;
    }

    return {
        id: result[0].id,
        slug: result[0].slug ?? "",
        title: result[0].title ?? "",
        created_at: result[0].created_at ?? "",
    }
}

async function createMessage(db: DrizzleD1Database, roomId: string, userId: string, text: string): Promise<Message | null> {
    const createdAt = getUnixTimestamp();
    const slug = bin2hex(16);

    await updateRoom(db, roomId, {
        created_at: createdAt.toString(),
    });

    const result = await db.insert(messages).values({
        room_id: roomId,
        slug: slug,
        author_id: userId,
        text: text,
        created_at: createdAt.toString(),
    }).returning().execute();

    if (result.length === 0) {
        return null;
    }

    return {
        id: result[0].id,
        slug,
        room_id: result[0].room_id ?? "",
        author_id: result[0].author_id ?? "",
        text: result[0].text ?? "",
        created_at: result[0].created_at ?? "",
    }
}

async function addUserToRoom(db: DrizzleD1Database, roomId: string, userId: string): Promise<RoomUser | null> {
    const createdAt = getUnixTimestamp();

    const result = await db.insert(roomUsers).values({
        room_id: roomId,
        user_id: userId,
        is_admin: 0,
        created_at: formatJST(createdAt),
    }).returning().execute();

    if (result.length === 0) {
        return null;
    }

    return {
        id: result[0].id,
        room_id: result[0].room_id ?? "",
        user_id: result[0].user_id ?? "",
        is_admin: result[0].is_admin ?? 0,
        created_at: result[0].created_at ?? "",
    }
}

async function removeUserFromRoom(db: DrizzleD1Database, roomId: string, userId: string): Promise<void> {
    await db.delete(roomUsers).where(and(eq(roomUsers.room_id, roomId), eq(roomUsers.user_id, userId))).execute();
}

export { 
    getRooms, getRoom, getRoomUsers, 
    getRoomDetails, getRoomMessages, createRoom,
    createMessage, addUserToRoom, removeUserFromRoom 
};