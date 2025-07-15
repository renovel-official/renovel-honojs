import NovelGenre from "@/types/genre";
import NovelType from "@/types/novel";
import { Episode } from "./episode";

interface Novel {
    id?: number;
    slug?: string;
    type?: NovelType;

    title: string;
    phrase: string;
    description: string;
    genre: NovelGenre;
    tags?: string;
    text?: string;

    created_at?: number;
    updated_at?: number;
}

interface NovelAuthor {
    id?: number;
    slug: string;
    novel_id: string;
    is_admin: number;
    created_at: string;
}

interface NovelResult {
    work: Novel;
    authors: NovelAuthor[];
    view?: number;
    follower?: number;
    episodes?: Episode[];
    isAuthor?: 0 | 1;
    isAdmin?: 0 | 1;
    isPublic?: 0 | 1;
}

interface NovelPayload {
    title: string;
    phrase: string;
    description?: string;
    genre: NovelGenre;
    tags: string;
    text?: string;

    type: NovelType;
    
    authors: string[];
    admin: string;
}


export type { Novel, NovelAuthor, NovelResult, NovelPayload };