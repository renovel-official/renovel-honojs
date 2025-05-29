import { DrizzleD1Database } from "drizzle-orm/d1";
import { sessions } from "@/db/d1";
import { eq, or } from "drizzle-orm";
import Session from "@/interfaces/session";

async function getSession(db: DrizzleD1Database, token: string | null, email?: string | null) {
    const getResult = await db.select().from(sessions).where(
        or(
            eq(sessions.email, email ?? ""),
            eq(sessions.token, token ?? "")
        )
    ).execute();

    if (getResult.length === 0) return null;

    return getResult[0];
}

export { getSession };