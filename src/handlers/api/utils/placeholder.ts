import { NovelAuthor, NovelResult } from "@/interfaces/novel";
import { getNovel } from "@/libs/novel";
import { getUser } from "@/libs/user";
import { Context } from "hono";
import Env from "@/interfaces/utils/env";

export default async function placeholderHandler(c: Context<Env>) {
  const { workId } = c.req.param();
  const { width, height } = c.req.query();

  if (!workId) {
    return c.json({ success: false, message: 'workId is required' }, 400);
  }
  if (isNaN(parseInt(workId))) {
    return c.json({ success: false, message: 'workId is not a number' }, 400);
  }
  const db = c.get('db');
  const result: NovelResult | null = await getNovel(db, workId);

  if (!result) {
    return c.json({ success: false, message: 'work not found' }, 404);
  }

  const { work, authors, episodes } = result;
  const adminEmail: string = authors.find((author: NovelAuthor) => author.is_admin)?.email ?? "";
  const admin = await getUser(db, adminEmail);


  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4f46e5" />
          <stop offset="100%" stop-color="#4338ca" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)" rx="12" ry="12"/>
      <text x="50%" y="45%" text-anchor="middle" fill="white" font-size="20" font-weight="bold" font-family="sans-serif">${work.title}</text>
      <text x="50%" y="65%" text-anchor="middle" fill="#ddd" font-size="14" font-family="sans-serif">by ${admin?.slug}</text>
    </svg>
    `;

  return c.text(svg, 200, {
    'Content-Type': 'image/svg+xml',
    'Cache-Control': 'no-cache',
  })
}