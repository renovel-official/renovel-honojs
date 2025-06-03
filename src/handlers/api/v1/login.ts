import { registSession } from "@/libs/session";
import { setCookie } from "hono/cookie";
import { and, eq } from "drizzle-orm";
import { Context } from "hono";
import { sha256 } from "@/utils/hash";
import { users } from "@/db/d1";
import Env from "@/interfaces/utils/env";

interface LoginPayload {
  email: string;
  password: string;
  origin?: string;
  location?: string;
  [key: string]: any;
}

async function loginHandler(c: Context<Env>) {
  const db = c.get("db");
  const contentType = c.req.header("content-type") || "";

  let data: LoginPayload;
  if (contentType.includes("application/json")) {
    data = await c.req.json();
  } else {
    data = await c.req.parseBody<LoginPayload>();
  }

  const { email, password, origin = "/", location } = data;

  // バリデーション
  if (!email || !password) {
    return location
      ? c.redirect(`${origin}?error=invalid_parameter`)
      : c.json({ success: false, message: "Invalid parameters." }, { status: 400 });
  }

  const hashedPassword = sha256(password);

  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.email, email), eq(users.password, hashedPassword)))
    .execute();

  if (!user) {
    return location
      ? c.redirect(`${origin}?error=user_not_found`)
      : c.json({ success: false, message: "User not found or password incorrect." }, { status: 401 });
  }

  const token = await registSession(db, email);

  if (!token) {
    return location
      ? c.redirect(`${origin}?error=session_creation_failed`)
      : c.json({ success: false, message: "Failed to create session." }, { status: 500 });
  }

  setCookie(c, "s-token", token, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 60 * 60 * 24 * 7, // 7日
  });

  return location
    ? c.redirect(location)
    : c.json({ success: true, message: "Login successful.", data: { token } });
}

export { loginHandler };
