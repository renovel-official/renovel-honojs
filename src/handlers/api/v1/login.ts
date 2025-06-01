import { registSession } from "@/libs/session";
import { setCookie } from "hono/cookie";
import { and, eq } from "drizzle-orm";
import { Context } from "hono";
import { sha256 } from "@/utils/hash";
import { users } from "@/db/d1";
import Env from "@/interfaces/utils/env";


interface loginPayload {
    email: string;
    password: string;
    origin?: string;
    location?: string;
}

async function loginHandler(c: Context<Env>) {
    const db = c.get('db');
    const contentType: string = c.req.header()['Content-Type'];
    const data: loginPayload = contentType.includes('json') ? 
        await c.req.json() :
        await c.req.parseBody();

    if (! (data.email && data.password)) {
        if (data.location) {
            return c.redirect(`${data.origin}?error=invalid_parameter`);
        }
        return c.json({ success: false, message: "The parameter invalied" }, { status: 400 })
    }

    const hashedPassword: string = sha256(data.password);

    const userResult = await db.select().from(users).where(
        and(
            eq(users.email, data.email), 
            eq(users.password, hashedPassword)
        )
    ).execute();

    if (userResult.length === 0) {
        if (data.location) {
            return c.redirect(`${data.origin}?error=user-not-found`);
        }
        return c.json({ success: false, message: "User not found. The password may be incorrect, or the user may not exist." })
    }

    const token = await registSession(db, data.email);

    if (!token) {
        if (data.location) {
            return c.redirect(`${data.origin}?error=failed-to-create-session`);
        }
        return c.json({ success: false, message: "Failed to create a session." })
    }

    if (data.location) {
        setCookie(c, 's-token', token, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 604800秒 -> 7日 -> 一週間
        });

        return c.redirect(data.location);
    }
    
    return c.json({ success: true, message: "Login successful.", data: { token } });
}

export { loginHandler };