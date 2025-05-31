import { DrizzleD1Database } from "drizzle-orm/d1";
import { getUnixTimestamp } from "@/utils/timestamp";
import { sessions } from "@/db/d1";
import { eq, or } from "drizzle-orm";
import Session from "@/interfaces/session";
import { bin2hex } from "@/utils/bin2hex";

async function getSession(db: DrizzleD1Database, token: string | null, email?: string | null): Promise<Session | null> {
    const getResult: Array<Session> = await db.select().from(sessions).where(
        or(
            eq(sessions.email, email ?? ""),
            eq(sessions.token, token ?? "")
        )
    ).execute() as unknown as Array<Session>;

    if (getResult.length === 0) return null;

    return getResult[0];
}

async function updateSession(db: DrizzleD1Database, token: string): Promise<boolean> {
    const getResult = await getSession(db, token);
    if (!getResult) return false;

    const updateResult = await db.update(sessions).set({
        last_logined_at: getUnixTimestamp()
    }).where(eq(
        sessions.token,
        token
    )).execute();

    return updateResult.success;
}

async function registSession(db: DrizzleD1Database, email: string): Promise<string | null> {
    const getResult = await getSession(db, null, email);
    if (getResult) {
        const token = getResult.token;
        if (await updateSession(db, token)) {
            return getResult.token
        } else {
            return null;
        }
    }

    const token = bin2hex(32);
    const result = await db.insert(sessions).values({
        token,
        email,
        last_logined_at: getUnixTimestamp()
    }).execute();

    if (result.success) return token;
    return null;
}

export { getSession };