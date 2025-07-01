import { getRoomDetails } from "@/libs/messages";
import { RoomUser } from "@/interfaces/messages";
import { Context } from "hono";
import Env from "@/interfaces/utils/env";

async function changeRoleHandler(c: Context<Env>) {
    const db = c.get("db");
    const { roomId } = c.req.param();
    const { memberId, roleId } = await c.req.json();

    const details = await getRoomDetails(db, roomId);
    if (!details) {
        return c.json({ error: "Room not found" }, 404);
    }

    const member = details.users.find((member: RoomUser) => member.user_id === memberId);
}

async function addMemberHandler(c: Context<Env>) {
}

async function deleteMemberHandler(c: Context<Env>) {
}