import { DrizzleD1Database } from "drizzle-orm/d1";
import { deleteSession } from "@/libs/session";
import { getCookie, deleteCookie } from "hono/cookie";
import { Context } from "hono";
import Env from "@/interfaces/utils/env";

async function logoutHandler(c: Context<Env>) {
  const db: DrizzleD1Database = c.get('db');
  const location: string | undefined = c.req.query('location');

  // クッキー or クエリパラメータからトークンを取得
  const tokenFromCookie = getCookie(c, 's-token');
  const tokenFromQuery = c.req.query('token');
  const token: string | undefined = tokenFromCookie ?? tokenFromQuery;

  if (!token) {
    const response = location
      ? c.redirect(`${location}?error=invalid_token`)
      : c.json({ success: false, message: "Invalid token." }, { status: 400 });
    return response;
  }

  // セッション削除
  const deleted = await deleteSession(db, token);

  // クッキーが存在する場合は削除
  if (tokenFromCookie) {
    deleteCookie(c, 's-token', { path: '/' });
  }

  if (!deleted) {
    const response = location
      ? c.redirect(`${location}?error=session_not_found`)
      : c.json({ success: false, message: "Session not found." }, { status: 404 });
    return response;
  }

  const response = location
    ? c.redirect(`${location}?success=logout`)
    : c.json({ success: true, message: "Logout successful." });

  return response;
}

export { logoutHandler };