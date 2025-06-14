import { DrizzleD1Database } from "drizzle-orm/d1";
import { addUserToRoom, createMessage } from "@/libs/messages";
import { registUser } from "@/libs/user";
import { Context } from "hono";
import Env from "@/interfaces/utils/env";

interface registerPayload {
    name: string;
    slug: string;
    email: string;
    password: string;
    password_confirmation: string;
    location?: string;
    origin?: string;
}

async function registerHandler(c: Context<Env>) {
    const contentType: string = c.req.header()['content-type'];
    const data: registerPayload = contentType.includes('json') ? 
        (await c.req.json()) as registerPayload :
        (await c.req.parseBody()) as unknown as registerPayload;

    if (!(data.name && data.slug && data.email && data.password && data.password_confirmation)) {
        if (data.location) {
            return c.redirect(`${data.origin}?error=invalid_parameter`);
        }
        return c.json({ success: false, message: "The parameter invalied" }, { status: 400 });
    }

    if (data.password !== data.password_confirmation) {
        if (data.location) {
            return c.redirect(`${data.origin}?error=password_confirmation_mismatch`);
        }
        return c.json({ success: false, message: "The password confirmation mismatch" }, { status: 400 });
    }

    if (!data.email.includes('@')) {
        if (data.location) {
            return c.redirect(`${data.origin}?error=invalid_email`);
        }
        return c.json({ success: false, message: "The email is invalid" }, { status: 400 });
    }

    console.log(data.slug);

    if (!data.slug.match(/^[a-z0-9]+$/)) {
        if (data.location) {
            return c.redirect(`${data.origin}?error=invalid_slug`);
        }
        return c.json({ success: false, message: "The slug is invalid" }, { status: 400 });
    }
    
    const db: DrizzleD1Database = c.get('db');
    const user = await registUser(db, data.email, data.name, data.slug, data.password);

    if (!user) {
        if (data.location) {
            return c.redirect(`${data.origin}?error=failed-to-create-user`);
        }
        return c.json({ success: false, message: "Failed to create a user." }, { status: 400 });
    }

    await addUserToRoom(db, "all_users", data.slug);
    await createMessage(db, "all_users", "system", `${data.name}さんが参加しました！`);

    if (data.location) {
        return c.redirect(data.location);
    }

    return c.json({ success: true, message: "Register successful.", data: { message: "Please login -> /api/v1/login" } });
}


export { registerHandler };