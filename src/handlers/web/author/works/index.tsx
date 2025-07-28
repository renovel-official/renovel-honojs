import AuthorWorks from "@/app/author/works";
import Env from "@/interfaces/utils/env";
import { Context } from "hono";

export default async function authorWorksHandler(c: Context<Env>) {
    const user = c.get('user');
    const novel = c.get('novel');
    
    // クエリパラメータを取得
    const searchParams = {
        search: c.req.query('search') || '',
        genre: c.req.query('genre') || '',
        status: c.req.query('status') || ''
    };
    
    const currentPage = parseInt(c.req.query('page') || '1');
    const limit = 10;
    const offset = (currentPage - 1) * limit;
    
    const novels = await novel?.getNovelsFromUser(user?.slug ?? "", limit, offset) ?? [];
    
    // 総ページ数を計算（実際の実装では総件数を取得して計算）
    const totalPages = Math.ceil(novels.length / limit) || 1;

    return c.render(
        <AuthorWorks 
            novels={novels} 
            currentPage={currentPage}
            totalPages={totalPages}
            searchParams={searchParams}
        />
    );
}