import User from "@/interfaces/user";
import WelcomeMessage from "@/components/ui/author/welcome-message";
import StatsDashboard from "@/components/ui/author/stats-dashboard";
import RecentWork from "@/components/ui/author/recent-works";
import RecentComments from "@/components/ui/author/recent-comments";
import QuickActions from "@/components/ui/author/quick-actions";
import { NovelResult } from "@/interfaces/novel";

interface AuthorProps {
    author: User | null | undefined;
    novels: Array<NovelResult>;
    comments: Array<{ author: string; roomId: string; roomName: string; content: string; timestamp: string }>;
}

export default function Author({ author, novels, comments }: AuthorProps) {

    return (
        <main>
            {/* ウェルカムメッセージ */}
            <WelcomeMessage authorName={author?.name ?? "unknown"} />

            {/* 統計ダッシュボード */}
            <StatsDashboard novels={novels} />

            {/* メインコンテンツ */}
            <div class="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 最近の作品 */}
                <div class="bg-white rounded-lg shadow-sm">
                    <div class="p-6 border-b border-gray-200">
                        <div class="flex items-center justify-between">
                            <h2 class="text-xl font-bold text-gray-800 flex items-center">
                                <i class="fas fa-clock text-gray-600 mr-2"></i>
                                最近の作品
                            </h2>
                            <a href="/author/works/new" class="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition duration-300 text-sm">
                                <i class="fas fa-plus mr-1"></i>
                                新規作成
                            </a>
                        </div>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4">
                            {novels.map((work: NovelResult) => (
                                <RecentWork novel={work} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* 最近のコメント */}
                <RecentComments comments={comments ?? []} />
            </div>

            {/* クイックアクション */}
            <div class="mt-8">
                <QuickActions />
            </div>
        </main>
    );
}