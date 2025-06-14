import AuthorMessagesRoom from "@/app/author/messages/[slug]";
import Env from "@/interfaces/utils/env";
import { getRoomDetails } from "@/libs/messages";
import { RoomResult } from "@/interfaces/messages";
import { Context } from "hono";

export default async function messageRoomHandler(c: Context<Env>) {
    const db = c.get('db');
    const roomId: string = c.req.param('roomId');
    const detail: RoomResult | null = await getRoomDetails(db, roomId);
    const userId = c.get('user')?.slug;

    if (!userId) {
        return c.redirect('/author/messages');
    }

    return c.render(detail ? <AuthorMessagesRoom detail={detail} userId={userId ?? ""} /> : <div />);
}