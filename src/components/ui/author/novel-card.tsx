import { NovelGenreData } from "@/types/genre";
import { NovelResult } from "@/interfaces/novel";

interface NovelCardProps {
    novel: NovelResult;
}

export default function NovelCard({ novel }: NovelCardProps) {
    return (
        <a href={`/author/works/${novel.work.slug}`}>
            <div class="p-6 hover:bg-gray-50 transition duration-300">
                <div class="flex items-start space-x-4">
                    <div class="w-20 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <i class="fas fa-book text-gray-400"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-start justify-between">
                            <div class="flex-1">
                                <h3 class="text-lg font-semibold text-gray-800 mb-1">
                                    {novel.work.title || '名称未設定'}
                                </h3>
                                <p class="text-sm text-gray-600 mb-2">{NovelGenreData[novel.work.genre]}</p>
                                <p class="text-sm text-gray-700 line-clamp-2 mb-3">
                                    {novel.work.description || 'まだ説明が設定されていません。'}
                                </p>
                                <div class="flex items-center space-x-4 text-xs text-gray-500">
                                    <span class="flex items-center">
                                        <i class="fas fa-calendar mr-1"></i>
                                        作成日: {novel.work.created_at ? new Date(novel.work.created_at * 1000).toLocaleDateString('ja-JP') : '-'}
                                    </span>
                                    <span class="flex items-center">
                                        <i class="fas fa-edit mr-1"></i>
                                        更新日: {novel.work.updated_at ? new Date(novel.work.updated_at * 1000).toLocaleDateString('ja-JP') : '-'}
                                    </span>
                                    <span class="flex items-center">
                                        <i class="fas fa-eye mr-1"></i>
                                        {novel.view || 0} views
                                    </span>
                                </div>
                            </div>
                            <div class="flex flex-col items-end space-y-2 ml-4">
                                <div class="flex items-center space-x-2">
                                    <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                        公開中
                                    </span>
                                    <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                        {novel.work.type}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
}
