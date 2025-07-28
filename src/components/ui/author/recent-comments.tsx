interface RecentComment {
    author: string;
    roomId: string;
    roomName: string;
    content: string;
    timestamp: string;
}

interface RecentCommentsProps {
    comments: RecentComment[];
}

export default function RecentComments({ comments }: RecentCommentsProps) {
    return (
        <div class="bg-white rounded-lg shadow-sm">
            <div class="p-6 border-b border-gray-200">
                <h2 class="text-xl font-bold text-gray-800 flex items-center">
                    <i class="fas fa-comments text-gray-600 mr-2"></i>
                    最近のチャット
                </h2>
            </div>

            <div class="p-6">
                <div class="space-y-4">
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <div class="border-b border-gray-200 pb-4 last:border-b-0" key={index}>
                                <a href={`/author/messages/${comment.roomId}`}>
                                    <div class="flex items-start space-x-3">
                                        <div class="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center">
                                            <i class="fas fa-user text-gray-600 text-sm"></i>
                                        </div>
                                        <div class="flex-1">
                                            <div class="flex items-center space-x-2 mb-1">
                                                <span class="font-medium text-sm text-gray-800">{comment.author}</span>
                                                <span class="text-xs text-gray-500">•</span>
                                                <span class="text-xs text-gray-500">{comment.timestamp}</span>
                                            </div>
                                            <div class="text-xs text-gray-600 mb-2">
                                                ルーム「{comment.roomName}」へのチャット
                                            </div>
                                            <p class="text-sm text-gray-700">{comment.content}</p>
                                        </div>
                                    </div>
                                </a>
                            </div>

                        ))
                    ) : (
                        <div class="text-center py-8">
                            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-comments text-2xl text-gray-400"></i>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-800 mb-2">まだコメントがありません</h3>
                            <p class="text-gray-600">読者からのコメントがここに表示されます</p>
                        </div>
                    )}
                </div>
                {comments.length > 0 && (
                    <div class="text-center mt-6">
                        <a href="/author/messages" class="text-gray-800 hover:text-gray-600 font-semibold text-sm">
                            すべてのメッセージを見る <i class="fas fa-arrow-right ml-1"></i>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
