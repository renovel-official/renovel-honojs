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

export default Episode;