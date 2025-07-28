interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl?: string;
    queryParams?: Record<string, string>;
}

export default function Pagination({ 
    currentPage, 
    totalPages, 
    baseUrl = "/author/works",
    queryParams = {}
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const buildUrl = (page: number) => {
        const params = new URLSearchParams(queryParams);
        params.set('page', page.toString());
        return `${baseUrl}?${params.toString()}`;
    };

    const renderPageNumbers = () => {
        const pages = [];
        const showPages = 5; // 表示するページ数
        let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
        let endPage = Math.min(totalPages, startPage + showPages - 1);

        if (endPage - startPage + 1 < showPages) {
            startPage = Math.max(1, endPage - showPages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <a
                    key={i}
                    href={buildUrl(i)}
                    class={`px-3 py-2 text-sm rounded transition duration-300 ${
                        i === currentPage
                            ? 'bg-gray-800 text-white'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                >
                    {i}
                </a>
            );
        }

        return pages;
    };

    return (
        <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex justify-center">
                <nav class="flex space-x-2 items-center">
                    {currentPage > 1 ? (
                        <a
                            href={buildUrl(currentPage - 1)}
                            class="px-3 py-2 text-sm bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition duration-300"
                        >
                            前へ
                        </a>
                    ) : (
                        <span class="px-3 py-2 text-sm bg-gray-100 text-gray-400 rounded cursor-not-allowed">
                            前へ
                        </span>
                    )}
                    
                    {renderPageNumbers()}
                    
                    {currentPage < totalPages ? (
                        <a
                            href={buildUrl(currentPage + 1)}
                            class="px-3 py-2 text-sm bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition duration-300"
                        >
                            次へ
                        </a>
                    ) : (
                        <span class="px-3 py-2 text-sm bg-gray-100 text-gray-400 rounded cursor-not-allowed">
                            次へ
                        </span>
                    )}
                </nav>
            </div>
        </div>
    );
}
