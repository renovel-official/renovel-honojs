import { Novel, NovelResult, NovelAuthor } from "@/interfaces/novel";
import { novels, authorNovels, episodes } from "@/db/d1";
import { DrizzleD1Database } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import Episode from "@/interfaces/episode";

export async function getNovel(db: DrizzleD1Database, workId: string) {
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