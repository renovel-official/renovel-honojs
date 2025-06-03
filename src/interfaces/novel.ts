import NovelGenre from "@/types/genre";
import NovelType from "@/types/novel";
import Episode from "./episode";

interface Novel {
    id?: number;
    slug?: string;
    type?: NovelType;

    title: string;
    phrase: string;
    point: number;
    description: string;
    genre: NovelGenre;
    tags?: string;
    text?: string;
    is_public?: boolean;

    created_at?: string;
    updated_at?: string;
}

interface NovelAuthor {
    id?: number;
    slug: string;
    novel_id: string;
    is_admin: boolean;
    created_at: string;
}

interface NovelResult {
    work: Novel;
    authors: NovelAuthor[];
    view?: number;
    follower?: number;
    episodes?: Episode[];
    isAuthor?: boolean;
    isAdmin?: boolean;
    isPublic?: boolean;
}


export type { Novel, NovelAuthor, NovelResult };