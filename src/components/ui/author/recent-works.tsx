import { NovelResult } from "@/interfaces/novel";
import { NovelGenreData } from "@/types/genre";
import { formatJST } from "@/utils/timestamp";

interface RecentWorksProps {
    novel: NovelResult;
    createUrl?: string;
    viewAllUrl?: string;
}


export default function RecentWork({ novel }: RecentWorksProps) {
    const { work } = novel; // Assuming we want to display the first work in the array

    return (
        <a href={`/author/works/${work.slug}`}>
            <div class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition duration-300">
                <div class="flex-1">
                    <h4 class="font-semibold text-gray-800 mb-1">{work.title}</h4>
                    <div class="flex items-center space-x-4 text-sm text-gray-600">
                        <span class="bg-gray-200 px-2 py-1 rounded text-xs">{NovelGenreData[work.genre]}</span>
                        <span><i class="fas fa-eye mr-1"></i>{novel.view}</span>
                        <span><i class="fas fa-calendar mr-1"></i>{formatJST(novel.work.updated_at ?? 0)}</span>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {novel.isPublic ? "公開中" : "非公開"}
                    </span>
                    <a href={`/author/works/${work.slug}`} class="text-gray-600 hover:text-gray-800">
                        <i class="fas fa-edit"></i>
                    </a>
                </div>
            </div>
        </a>
    )
}