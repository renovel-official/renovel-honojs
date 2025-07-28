import Author from "@/app/author";
import Env from "@/interfaces/utils/env";
import { getRooms } from "@/libs/messages";
import { formatJST } from "@/utils/timestamp";
import { Context } from "hono";

export default async function authorHandler(c: Context<Env>) {
    const novel = c.get('novel');
    const user = c.get('user');
    const db = c.get('db');
    const novels = await novel?.getNovelsFromUser(user?.slug ?? "", 5) ?? [];

    const rooms = await getRooms(db, user?.slug ?? "", 5) ?? [];
    /**
     * author: string;
    roomId: string;
    roomName: string;
    content: string;
    timestamp: string;
     */

    const sortedRooms = rooms.sort((a, b) => {
        return parseInt(b.room.created_at) - parseInt(a.room.created_at);
    });

    const comments = sortedRooms.map(room => ({
        author: room.messages[0]?.author_id,
        roomId: room.room.slug,
        roomName: room.room.title,
        content: (room.messages[0]?.text || "").slice(0, 39) + (room.messages[0]?.text?.length > 39 ? "..." : ""),
        timestamp: formatJST(parseInt(room.messages[0]?.created_at))
    }));

    return c.render(<Author author={user} novels={novels ?? []} comments={comments} />);
}