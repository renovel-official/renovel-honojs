import { Novel, NovelResult, NovelAuthor, NovelPayload } from "@/interfaces/novel";
import { novels, authorNovels, episodes } from "@/db/d1";
import { bin2hex, randomNumber } from "@/utils/random";
import { DrizzleD1Database } from "drizzle-orm/d1";
import { getUnixTimestamp } from "@/utils/timestamp";
import { Episode } from "@/interfaces/episode";
import { eq } from "drizzle-orm";


async function getNovel(db: DrizzleD1Database, workId: string): Promise<NovelResult | null> {
    const works = await db.select().from(novels).where(eq(novels.slug, workId)).limit(1).execute();
    if (works.length === 0) {
        return null;
    }

    const work: Novel = works[0] as unknown as Novel;

    const author = await db.select().from(authorNovels).where(eq(authorNovels.novel_id, work.slug?.toString() ?? "")).execute() as unknown as NovelAuthor[];
    const episode = await db.select().from(episodes).where(eq(episodes.novel_id, work.slug?.toString() ?? "")).execute() as unknown as Episode[];
    const result: NovelResult = {
        work,
        authors: author,
        episodes: episode,
    }

    return result;
}

async function getNovels(db: DrizzleD1Database, limit: number = 10, start: number = 0): Promise<null | Novel[]> {
    try {
        const results = await db.select().from(novels).where(
            eq(novels.is_public, 1)
        ).limit(limit).offset(start).execute();

        return results as any[] as Novel[];
    } catch (e) {
        return null;
    }
}

async function getNovelsFromUser(db: DrizzleD1Database, email: string, limit: number = 10, start: number = 0): Promise<null | Novel[]> {
    try {
        const results = await db.select().from(authorNovels).where(
            eq(authorNovels.email, email)
        ).limit(limit).offset(start).execute();

        return results as any[] as Novel[];
    } catch (e) {
        return null;
    }
}

async function createNovel(db: DrizzleD1Database, data: NovelPayload) {
    const slug = randomNumber().toString();
    const createdAt = getUnixTimestamp().toString();
    const novelAuthors: NovelAuthor[] = data.authors.map((author: string) => ({ slug: author, novel_id: slug, is_admin: author === data.admin ? 1 : 0, created_at: createdAt }));
    const novel: Novel = {
        slug: slug ?? "",
        type: data.type,

        title: data.title,
        phrase: data.phrase,
        description: data.description ?? "",
        genre: data.genre,
        tags: data.tags,
        text: data.text,

        created_at: parseInt(createdAt),
        updated_at: parseInt(createdAt)
    }

    try {
        const result = await db.insert(novels).values(novel);
    }
}


export { getNovel, getNovels }