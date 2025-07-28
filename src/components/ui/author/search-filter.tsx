interface SearchFilterProps {
    searchValue?: string;
    genreValue?: string;
    statusValue?: string;
    actionUrl?: string;
}

export default function SearchFilter({ 
    searchValue = "",
    genreValue = "",
    statusValue = "",
    actionUrl = "/author/works"
}: SearchFilterProps) {
    return (
        <div class="bg-white rounded-lg shadow-sm p-6">
            <form method="get" action={actionUrl}>
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <input 
                            type="text" 
                            name="search"
                            value={searchValue}
                            placeholder="作品タイトルで検索..." 
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                    </div>
                    <div class="flex gap-2">
                        <select 
                            name="genre"
                            value={genreValue}
                            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        >
                            <option value="">すべてのジャンル</option>
                            <option value="fantasy">ファンタジー</option>
                            <option value="romance">恋愛</option>
                            <option value="sf">SF</option>
                            <option value="mystery">ミステリー</option>
                        </select>
                        <select 
                            name="status"
                            value={statusValue}
                            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        >
                            <option value="">すべての状態</option>
                            <option value="published">公開中</option>
                            <option value="draft">下書き</option>
                            <option value="completed">完結</option>
                        </select>
                        <button 
                            type="submit"
                            class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition duration-300"
                        >
                            検索
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
