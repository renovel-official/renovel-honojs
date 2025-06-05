import { Message, Room, RoomUser } from "@/interfaces/messages";
import { D1Database } from "@cloudflare/workers-types";
import { getUser } from "./user";
import { Context } from "hono";
import { eq, or } from "drizzle-orm";
import Env from "@/interfaces/utils/env";

export async function getRooms(db: D1Database, userId: string): Promise<Array<Room>> {

}