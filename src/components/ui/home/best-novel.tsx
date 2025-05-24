import { NovelResult } from "@/interfaces/novel";

interface BestNovelProps {
    novel: NovelResult;
}
export default function BestNovel({ novel }: BestNovelProps) {
    const work = novel.work;
    const authors = novel.authors;
    const admin = authors.find((author) => author.is_admin);

    return (
        <div class="border rounded-lg p-4 hover:shadow-md transition duration-300">
            <img src="/api/placeholder/300/200" alt="小説カバー" class="w-full h-32 object-cover rounded mb-3" />
            <h4 class="font-semibold text-lg mb-2">{ work.title }</h4>
            <p class="text-gray-600 text-sm mb-2">{ work.genre }</p>
            <p class="text-gray-700 text-sm mb-3">{ work.description }</p>
            <div class="flex justify-between items-center text-sm text-gray-500">
                <span><i class="fas fa-user mr-1"></i>{ admin?.id }</span>
                <span><i class="fas fa-eye mr-1"></i>{ novel.view } views</span>
            </div>
        </div>
    )
}