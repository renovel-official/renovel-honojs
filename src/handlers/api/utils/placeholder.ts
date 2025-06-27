import { NovelAuthor, NovelResult } from "@/interfaces/novel";
import { getNovel } from "@/libs/novel";
import { Context } from "hono";
import Env from "@/interfaces/utils/env";

async function placeholderHandler(c: Context<Env>) {
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

  const { work, authors } = result;
  const adminId: string = authors.find((author: NovelAuthor) => author.is_admin)?.slug ?? "";

  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="100%" stop-color="#f3f4f6" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)" rx="24" />

      <!-- 上部ロゴ -->
      <g transform="translate(60, 60)">
        <image href="/icon.png" width="64" height="64" />
        <text x="80" y="48" font-size="36" font-family="'Helvetica Neue', sans-serif" fill="#111827" font-weight="600">ReNovel</text>
      </g>

      <!-- タイトル（中央上部） -->
      <text x="50%" y="48%" text-anchor="middle"
            fill="#111827" font-size="56" font-weight="600"
            font-family="'Helvetica Neue', sans-serif">${work.title}</text>

      <!-- 紹介文 -->
      <text x="50%" y="58%" text-anchor="middle"
        fill="#4b5563" font-size="28" font-family="'Helvetica Neue', sans-serif">
        ${ work.description.length > 15 ? work.description.slice(0, 15) + "..." : work.description }
      </text>

      <!-- 作者名 -->
      <text x="50%" y="70%" text-anchor="middle"
            fill="#6b7280" font-size="24" font-family="'Helvetica Neue', sans-serif">by ${adminId.length > 10 ? adminId.slice(0, 10) + "..." : work}</text>

      <!-- 下部装飾線とキャッチコピー -->
      <line x1="40" y1="590" x2="1160" y2="590" stroke="#e5e7eb" stroke-width="2" />
      <text x="50%" y="620" text-anchor="middle" fill="#9ca3af" font-size="20" font-family="'Helvetica Neue', sans-serif">
        ReNovel - 小説で世界をつなぐ
      </text>
    </svg>
    `;

  return c.text(svg, 200, {
    'content-type': 'image/svg+xml',
    'Cache-Control': 'no-cache',
  })
}

export { placeholderHandler };