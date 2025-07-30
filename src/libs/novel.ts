import { Novel, NovelResult, NovelAuthor, NovelPayload } from "@/interfaces/novel";
import { novels, authorNovels, episodes } from "@/db/d1";
import { DrizzleD1Database } from "drizzle-orm/d1";
import { getUnixTimestamp } from "@/utils/timestamp";
import { randomNumber } from "@/utils/random";
import { Episode } from "@/interfaces/episode";
import { eq, or, like, and } from "drizzle-orm";


class NovelController {
    private db: DrizzleD1Database;

    constructor (db: DrizzleD1Database) {
        this.db = db;
    }

    async getNovel(workId: string): Promise<NovelResult | null> {
        const works = await this.db.select().from(novels).where(eq(novels.slug, workId)).limit(1).execute();
        if (works.length === 0) {
            return null;
        }
    
        const work: Novel = works[0] as unknown as Novel;
    
        const author = await this.db.select().from(authorNovels).where(eq(authorNovels.novel_id, work.slug?.toString() ?? "")).execute() as unknown as NovelAuthor[];
        const episode = await this.db.select().from(episodes).where(eq(episodes.novel_id, work.slug?.toString() ?? "")).execute() as unknown as Episode[];
        const result: NovelResult = {
            work,
            authors: author,
            episodes: episode,
        }
    
        return result;
    }
    
    async getNovels(limit: number = 10, start: number = 0): Promise<null | Novel[]> {
        try {
            const results = await this.db.select().from(novels).limit(limit).offset(start).execute();
    
            return results as any[] as Novel[];
        } catch (e) {
            return null;
        }
    }

    async searchNovels(query: string, limit: number = 10, start: number = 0): Promise<null | Novel[]> {
        try {
            const results = await this.db.select().from(novels).where(
                or(
                    like(novels.title, `%${query}%`),
                    like(novels.phrase, `%${query}%`),
                    like(novels.description, `%${query}%`),
                    like(novels.tags, `%${query}%`),
                    like(novels.genre, `%${query}%`),
                    like(novels.text, `%${query}%`),
                    like(novels.slug, `%${query}%`),
                    like(novels.type, `%${query}%`),
                )
            ).limit(limit).offset(start).execute();
    
            return results as any[] as Novel[];
        } catch (e) {
            return null;
        }
    }

    async searchNovelsByMultipleKeywords(keywords: string[], limit: number = 10, start: number = 0): Promise<null | Novel[]> {
        try {
            if (keywords.length === 0) {
                return [];
            }

            // 各キーワードに対して検索条件を作成
            const searchConditions = keywords.map(keyword => 
                or(
                    like(novels.title, `%${keyword}%`),
                    like(novels.phrase, `%${keyword}%`),
                    like(novels.description, `%${keyword}%`),
                    like(novels.tags, `%${keyword}%`),
                    like(novels.genre, `%${keyword}%`),
                    like(novels.text, `%${keyword}%`),
                    like(novels.slug, `%${keyword}%`),
                    like(novels.type, `%${keyword}%`),
                )
            );

            // 全てのキーワードが含まれる小説を検索（AND検索）
            const results = await this.db.select().from(novels).where(
                and(...searchConditions)
            ).limit(limit).offset(start).execute();

            return results as any[] as Novel[];
        } catch (e) {
            return null;
        }
    }

    async searchNovelsByAnyKeyword(keywords: string[], limit: number = 10, start: number = 0): Promise<null | Novel[]> {
        try {
            if (keywords.length === 0) {
                return [];
            }

            // 各キーワードに対して検索条件を作成し、いずれかにマッチする小説を検索（OR検索）
            const searchConditions = keywords.flatMap(keyword => [
                like(novels.title, `%${keyword}%`),
                like(novels.phrase, `%${keyword}%`),
                like(novels.description, `%${keyword}%`),
                like(novels.tags, `%${keyword}%`),
                like(novels.genre, `%${keyword}%`),
                like(novels.text, `%${keyword}%`),
                like(novels.slug, `%${keyword}%`),
                like(novels.type, `%${keyword}%`),
            ]);

            const results = await this.db.select().from(novels).where(
                or(...searchConditions)
            ).limit(limit).offset(start).execute();

            return results as any[] as Novel[];
        } catch (e) {
            return null;
        }
    }
    
    async getNovelsFromUser(slug: string, limit: number = 10, start: number = 0): Promise<null | NovelResult[]> {
        try {
            const results: NovelAuthor[] = await this.db.select().from(authorNovels).where(
                eq(authorNovels.slug, slug)
            ).limit(limit).offset(start).execute() as unknown as NovelAuthor[];

            if (results.length === 0) {
                return [];
            }

            const data = [];
            for (const result of results) {
                const novel = await this.getNovel(result.novel_id);
                if (novel) {
                    data.push(novel);
                }
            }

            return data as NovelResult[];

        } catch (e) {
            return null;
        }
    }
    
    async createNovel(data: NovelPayload): Promise<null | NovelResult> {
        const slug = randomNumber().toString();
        const createdAt = getUnixTimestamp().toString();
        const novelAuthors: NovelAuthor[] = data.authors.map((author: string) => ({
            slug: author,
            novel_id: slug,
            is_admin: author === data.admin ? 1 : 0,
            created_at: createdAt,
        }));

        // adminがすでに存在するか確認
        const existsAdmin = novelAuthors.some(author => author.slug === data.admin);
        if (!existsAdmin) {
            novelAuthors.push({
                slug: data.admin,
                novel_id: slug,
                is_admin: 1,
                created_at: createdAt,
            });
        }

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
            await this.db.insert(novels).values(novel as any).execute();
        } catch (e) {
            // throw new Error("Failed to create novel: " + e);
            return e as any;
        }
    
        try {
            await this.db.insert(authorNovels).values(novelAuthors as any).execute();
        } catch (e) {
            // console.error("Failed to create novel authors:", e);
            // throw new Error("Failed to create novel authors: " + e);
            return e as any;
        }
    
        return await this.getNovel(slug);
    }
    
    async removeNovel(workId: string): Promise<boolean> {
        try {
            const result = await this.db.delete(novels).where(eq(novels.slug, workId)).execute();
            if (result.changes === 0) {
                return false; // 削除されなかった場合
            }
            return true; // 削除成功
        } catch (error) {
            console.error("Error deleting novel:", error);
            return false; // エラーが発生した場合
        }

    }
}



export { NovelController }