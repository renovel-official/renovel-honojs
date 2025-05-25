import { DrizzleD1Database } from "drizzle-orm/d1";
import { accounts } from "@/db/d1";
import { eq, or } from "drizzle-orm";
import User from "@/interfaces/user";

async function getUser(db: DrizzleD1Database, email: string | null, userSlug?: string): Promise<null | User> {
    const result = await db.select().from(accounts).where(
        or(
            eq(accounts.email, email ?? ""), 
            eq(accounts.slug, userSlug ?? "")
        )
    ).execute();
    if (result.length == 0) return null;

    return result[0] as unknown as User;
}

export { getUser };