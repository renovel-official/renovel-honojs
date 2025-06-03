interface Episode {
    id?: number;
    novel_id: string;
    slug: string;
    title: string;
    text: string;
    good: number;
    view: number;
    public_date: number;
    created_at: string;
    updated_at: string;
}

interface EpisodeComment {
    id?: number;
    comment_id: string;
    author_id: string;
    work_id: string;
    episode_id: string;

    text: string;

    created_at: number;
}

export { Episode, EpisodeComment };