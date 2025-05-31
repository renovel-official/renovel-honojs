import { DrizzleD1Database } from "drizzle-orm/d1";
import { users } from "@/db/d1";
import { eq, or } from "drizzle-orm";
import User from "@/interfaces/user";

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

  const insertResult = await db
    .insert(users)
    .values({
      slug,
      name,
      email,
      password,
      description: "",
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

export { getUser, registUser, updateUser };