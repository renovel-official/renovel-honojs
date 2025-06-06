import { getUnixTimestamp, unixToJSTDate, formatJST } from "@/utils/timestamp";
import { DrizzleD1Database } from "drizzle-orm/d1";
import { sha256 } from "@/utils/hash";
import { users } from "@/db/d1";
import { eq, or } from "drizzle-orm";
import User from "@/interfaces/user";
import { NovelAuthor } from "@/interfaces/novel";

/**
 * Get user from email or slug.
 * @param db - Drizzle D1 database instance
 * @param email - User email
 * @param slug - User slug
 * @returns A User object or null
 */
async function getUser(
  db: DrizzleD1Database,
  email: string | null,
  slug?: string | null
): Promise<User | null> {
  const result = await db
    .select()
    .from(users)
    .where(
      or(eq(users.email, email ?? ""), eq(users.slug, slug ?? ""))
    )
    .execute();

  if (result.length === 0) return null;
  return result[0] as unknown as User;
}

async function getUsers(db: DrizzleD1Database): Promise<Array<NovelAuthor>> {
  return await db
    .select({
      slug: users.slug,
      name: users.name,
      description: users.description,
    })
    .from(users)
    .execute() as unknown as Array<NovelAuthor>;
}

/**
 * Register a new user.
 * @param db - Drizzle D1 database instance
 * @param email - User email
 * @param name - User name
 * @param slug - User slug
 * @param password - User password
 * @returns Whether registration was successful
 */
async function registUser(
  db: DrizzleD1Database,
  email: string,
  name: string,
  slug: string,
  password: string
): Promise<boolean> {
  const existing = await db
    .select()
    .from(users)
    .where(or(eq(users.email, email), eq(users.slug, slug)))
    .execute();

  if (existing.length !== 0) return false; // Already exists

  const hashedPassword = sha256(password);

  const insertResult = await db
    .insert(users)
    .values({
      slug,
      name,
      email,
      password: hashedPassword,
      description: "",
      created_at: formatJST(getUnixTimestamp()),
    })
    .execute();

  return insertResult.success;
}

/**
 * Update user data by email or slug.
 * @param db - Drizzle D1 database instance
 * @param email - User email
 * @param slug - User slug
 * @param data - Fields to update
 * @returns Whether update was successful
 */
async function updateUser(
  db: DrizzleD1Database,
  email: string | null,
  slug: string | null,
  data: Record<string, any>
): Promise<boolean> {
  const user = await getUser(db, email, slug);
  if (user === null) return false;

  const updateResult = await db
    .update(users)
    .set(data)
    .where(
      or(eq(users.email, email ?? ""), eq(users.slug, slug ?? ""))
    )
    .execute();

  return updateResult.success;
}

export { getUser, getUsers, registUser, updateUser };