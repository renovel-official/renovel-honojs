import { getCookie, setCookie } from "hono/cookie";
import { accounts } from "@/db/d1";
import { bin2hex } from "@/utils/bin2hex";
import { and, eq } from "drizzle-orm";
import { Context } from "hono";
import { sha256 } from "@/utils/hash";
import Env from "@/interfaces/utils/env";
import Session from "@/interfaces/session";



interface loginPayload {
    email: string;
    password: string;
}

async function loginHandler(c: Context<Env>) {
    const db = c.get('db');
    const contentType: string = c.req.header()['Content-Type'];
    const data: loginPayload = contentType.includes('json') ? 
        await c.req.json() :
        await c.req.parseBody();

    if (! (data.email && data.password)) {
        return c.json({ success: false, message: "The parameter invalied" }, { status: 400 })
    }

    const hashedPassword: string = sha256(data.password);

    const users = await db.select().from(accounts).where(
        and(
            eq(accounts.email, data.email), 
            eq(accounts.password, hashedPassword)
        )
    ).execute();

    if (users.length === 0) {
        return c.json({ success: false, message: "User not found. The password may be incorrect, or the user may not exist." })
    }

    const token = bin2hex(32);
}