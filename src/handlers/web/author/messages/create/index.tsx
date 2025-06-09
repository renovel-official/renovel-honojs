import { Context } from "hono";
import AuthorMessagesCreate from "@/app/author/messages/create";
import Env from "@/interfaces/utils/env";

export default async function authorMessagesCreateHandler(c: Context<Env>) {
    const user = c.get('user');

    if (!user) {
        return c.redirect('/login');
    }

    return c.render(<AuthorMessagesCreate />);
}