import AuthorMessages from "@/app/author/messages";
import Env from "@/interfaces/utils/env";
import { getRooms } from "@/libs/messages";
import { Context } from "hono";

export default async function authorMessagesHandler(c: Context<Env>) {
    const db = c.get('db');
    const user = c.get('user');

    if (!user) {
        return c.redirect('/login');
    }

    const rooms = await getRooms(db, user.slug);

    return c.render(<AuthorMessages rooms={rooms} />);
}