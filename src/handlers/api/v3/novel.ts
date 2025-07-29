import { NovelController } from "@/libs/novel";
import { NovelPayload } from "@/interfaces/novel";
import { Context } from "hono";
import Env from "@/interfaces/utils/env";


async function novelListHandler(c: Context<Env>) {
    const novel = c.get('novel') as NovelController;
    const limit = c.req.query('limit') ? parseInt(c.req.query('limit') as string) : 20;
    const offset = c.req.query('offset') ? parseInt(c.req.query('offset') as string) : 0;
    const query = c.req.query('query');

    if (query) {
        const isMultipleKeywords = query.includes(' '); // スペースで区切られた複数のキーワードを検出
        if (isMultipleKeywords) {
            const keywords = query.split(' ').map(k => k.trim()).filter(k => k.length > 0);
            const novels = await novel.searchNovelsByMultipleKeywords(keywords, limit, offset);
            return c.json({
                success: true,
                data: novels
            });
        }

        const novels = await novel.searchNovels(query, limit, offset);
        return c.json({
            success: true,
            data: novels
        });
    }

    const novels = await novel.getNovels(limit, offset);

    return c.json({
        success: true,
        data: novels
    });
}

async function novelCreateHandler(c: Context<Env>) {
    const user = c.get('user');
    const novel = c.get('novel') as NovelController;

    if (!user) {
        return c.json({ success: false, message: 'User not authenticated' }, 401);
    }

    const contentType = c.req.header('Content-Type');
    if (contentType !== 'application/json') {
        return c.json({ success: false, message: 'Invalid content type' }, 400);
    }

    const body: NovelPayload = await c.req.json();
    body.authors.push(user.slug); // ユーザーを作者として追加

    try {
        const novelData = await novel.createNovel({ ...body, admin: user.slug });
        return c.json({ success: true, data: novelData }, 201);
    } catch (error) {
        return c.json({ success: false, message: 'Failed to create novel' }, 500);
    }
}

export { novelListHandler, novelCreateHandler };