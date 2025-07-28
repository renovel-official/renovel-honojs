import { NovelResult } from "@/interfaces/novel";
import NovelCard from "./novel-card";
import EmptyState from "./empty-state";

interface NovelListProps {
    novels: NovelResult[];
    title?: string;
    emptyTitle?: string;
    emptyDescription?: string;
    emptyActionText?: string;
    emptyActionHref?: string;
}

export default function NovelList({
    novels,
    title = "作品一覧",
    emptyTitle = "まだ作品がありません",
    emptyDescription = "最初の作品を作成して、創作活動を始めましょう。",
    emptyActionText = "新しい作品を作成",
    emptyActionHref = "/author/works/new"
}: NovelListProps) {
    return (
        <div class="bg-white rounded-lg shadow-sm">
            <div class="p-6 border-b border-gray-200">
                <h2 class="text-xl font-bold text-gray-800 flex items-center">
                    <i class="fas fa-list mr-2"></i>
                    {title}
                </h2>
            </div>
            
            {novels && novels.length > 0 ? (
                <div class="divide-y divide-gray-200">
                    {novels.map((novel, index) => (
                        <NovelCard key={index} novel={novel} />
                    ))}
                </div>
            ) : (
                <EmptyState
                    title={emptyTitle}
                    description={emptyDescription}
                    actionText={emptyActionText}
                    actionHref={emptyActionHref}
                />
            )}
        </div>
    );
}
