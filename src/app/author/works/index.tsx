import { NovelResult } from "@/interfaces/novel";
import PageHeader from "@/components/ui/author/page-header";
import StatsDashboard from "@/components/ui/author/stats-dashboard";
import SearchFilter from "@/components/ui/author/search-filter";
import NovelList from "@/components/ui/author/novel-list";
import Pagination from "@/components/ui/author/pagination";

interface AuthorNovelProps {
    novels: Array<NovelResult>;
    currentPage?: number;
    totalPages?: number;
    searchParams?: {
        search?: string;
        genre?: string;
        status?: string;
    };
}

export default function AuthorWorks({ 
    novels, 
    currentPage = 1, 
    totalPages = 1,
    searchParams = {}
}: AuthorNovelProps) {
    return (
        <div class="space-y-6">
            {/* ページヘッダー */}
            <PageHeader
                title="作品管理"
                description="あなたの作品を管理・編集できます"
                actionText="新しい作品を作成"
                actionHref="/author/works/new"
            />

            {/* 作品統計 */}
            <StatsDashboard novels={novels} />

            {/* フィルター・検索バー */}
            <SearchFilter
                searchValue={searchParams.search}
                genreValue={searchParams.genre}
                statusValue={searchParams.status}
                actionUrl="/author/works"
            />

            {/* 作品一覧 */}
            <NovelList novels={novels} />

            {/* ページネーション */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                baseUrl="/author/works"
                queryParams={searchParams}
            />
            
            <script type="application/json" id="novels-data">
                {novels ? JSON.stringify(novels) : '[]'}
            </script>

            <script src="/assets/service/author/works/app.js"></script>
        </div>
    );
}