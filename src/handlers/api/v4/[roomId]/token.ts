import { getRoom } from "@/libs/messages";
import { Context } from "hono";
import Ably from "ably";
import Env from "@/interfaces/utils/env";

async function getMessageRealTimeTokenHandler(c: Context<Env>) {
    const user = c.get('user');

    if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
    }

    const db = c.get('db');
    const roomId = c.req.param('roomId');
    const room = await getRoom(db, roomId);

    if (!room) {
        return c.json({ error: "Room not found" }, 404);
    }

    const ablyToken = c.get('ablyToken');
    const ably = new Ably.Rest({ key: ablyToken });

    const tokenRequest = await ably.auth.createTokenRequest({
        capability: {
            [`chat-${roomId}`]: ["subscribe", "publish"]
        },
        clientId: user.email,
        ttl: 60 * 30 * 1000, // 30分
    });

    return c.json(tokenRequest);
}

export { getMessageRealTimeTokenHandler };