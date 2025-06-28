import MessageSettings from "@/app/author/messages/[slug]/settings/page";
import Env from "@/interfaces/utils/env";
import { getRoomDetails } from "@/libs/messages";
import { RoomResult } from "@/interfaces/messages";
import { Context } from "hono";

export default async function messageRoomSettingHandler(c: Context<Env>) {
    const db = c.get('db');
    const roomId: string = c.req.param('roomId');
    const detail: RoomResult | null = await getRoomDetails(db, roomId);
    const user = c.get('user');


    if (!user || !detail) {
        return c.redirect(`/author/messages/${roomId}`);
    }

    const member = detail.users.find((member) => member.user_id == user.slug);

    if (!member || member.is_admin === 0) {
        return c.redirect(`/author/messages/${roomId}`);
    }


    return c.render(<MessageSettings room={detail} user={user} />);
}