import User from "@/interfaces/user";

interface AuthorProps {
    author: User | null | undefined;
}

export default function Author({ author }: AuthorProps) {
    return (
        <main>
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">
                    おかえりなさい、{ author?.name }さん
                </h1>
                <p class="text-gray-600">
                    今日も素晴らしい作品を世界に届けましょう！
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex items-center">
                        <div class="bg-blue-100 p-3 rounded-full">
                            <i class="fas fa-book text-blue-600 text-xl"></i>
                        </div>
                        <div class="ml-4">
                            <h3 class="text-2xl font-bold text-gray-800">12</h3>
                            <p class="text-gray-600 text-sm">投稿作品数</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex items-center">
                        <div class="bg-green-100 p-3 rounded-full">
                            <i class="fas fa-eye text-green-600 text-xl"></i>
                        </div>
                        <div class="ml-4">
                            <h3 class="text-2xl font-bold text-gray-800">45,623</h3>
                            <p class="text-gray-600 text-sm">総閲覧数</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex items-center">
                        <div class="bg-purple-100 p-3 rounded-full">
                            <i class="fas fa-users text-purple-600 text-xl"></i>
                        </div>
                        <div class="ml-4">
                            <h3 class="text-2xl font-bold text-gray-800">156</h3>
                            <p class="text-gray-600 text-sm">フォロワー数</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex items-center">
                        <div class="bg-orange-100 p-3 rounded-full">
                            <i class="fas fa-comments text-orange-600 text-xl"></i>
                        </div>
                        <div class="ml-4">
                            <h3 class="text-2xl font-bold text-gray-800">89</h3>
                            <p class="text-gray-600 text-sm">コメント数</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                            <div class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition duration-300">
                                <div class="flex-1">
                                    <h4 class="font-semibold text-gray-800 mb-1">魔法学園の恋愛事件簿</h4>
                                    <div class="flex items-center space-x-4 text-sm text-gray-600">
                                        <span class="bg-gray-200 px-2 py-1 rounded text-xs">学園ファンタジー</span>
                                        <span><i class="fas fa-eye mr-1"></i>3,542 views</span>
                                        <span><i class="fas fa-calendar mr-1"></i>2日前</span>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <span class="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        公開中
                                    </span>
                                    <a href="/author/works/1" class="text-gray-600 hover:text-gray-800">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                </div>
                            </div>

                            <div class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition duration-300">
                                <div class="flex-1">
                                    <h4 class="font-semibold text-gray-800 mb-1">宇宙海賊の冒険記</h4>
                                    <div class="flex items-center space-x-4 text-sm text-gray-600">
                                        <span class="bg-gray-200 px-2 py-1 rounded text-xs">SF</span>
                                        <span><i class="fas fa-eye mr-1"></i>1,234 views</span>
                                        <span><i class="fas fa-calendar mr-1"></i>5日前</span>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <span class="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        下書き
                                    </span>
                                    <a href="/author/works/2" class="text-gray-600 hover:text-gray-800">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                </div>
                            </div>

                            <div class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition duration-300">
                                <div class="flex-1">
                                    <h4 class="font-semibold text-gray-800 mb-1">現代魔法使いの日常</h4>
                                    <div class="flex items-center space-x-4 text-sm text-gray-600">
                                        <span class="bg-gray-200 px-2 py-1 rounded text-xs">現代ファンタジー</span>
                                        <span><i class="fas fa-eye mr-1"></i>8,901 views</span>
                                        <span><i class="fas fa-calendar mr-1"></i>1週間前</span>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <span class="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        公開中
                                    </span>
                                    <a href="/author/works/3" class="text-gray-600 hover:text-gray-800">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-6">
                            <a href="/author/works" class="text-gray-800 hover:text-gray-600 font-semibold text-sm">
                                すべての作品を見る <i class="fas fa-arrow-right ml-1"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow-sm">
                    <div class="p-6 border-b border-gray-200">
                        <h2 class="text-xl font-bold text-gray-800 flex items-center">
                            <i class="fas fa-comments text-gray-600 mr-2"></i>
                            最近のコメント
                        </h2>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4">
                            <div class="border-b border-gray-200 pb-4">
                                <div class="flex items-start space-x-3">
                                    <div class="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center">
                                        <i class="fas fa-user text-gray-600 text-sm"></i>
                                    </div>
                                    <div class="flex-1">
                                        <div class="flex items-center space-x-2 mb-1">
                                            <span class="font-medium text-sm text-gray-800">読者A</span>
                                            <span class="text-xs text-gray-500">•</span>
                                            <span class="text-xs text-gray-500">3時間前</span>
                                        </div>
                                        <div class="text-xs text-gray-600 mb-2">
                                            作品「魔法学園の恋愛事件簿」へのコメント
                                        </div>
                                        <p class="text-sm text-gray-700">とても面白い展開でした！続きが楽しみです。キャラクターの心理描写が素晴らしいですね。</p>
                                    </div>
                                </div>
                            </div>

                            <div class="border-b border-gray-200 pb-4">
                                <div class="flex items-start space-x-3">
                                    <div class="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center">
                                        <i class="fas fa-user text-gray-600 text-sm"></i>
                                    </div>
                                    <div class="flex-1">
                                        <div class="flex items-center space-x-2 mb-1">
                                            <span class="font-medium text-sm text-gray-800">小説愛好家</span>
                                            <span class="text-xs text-gray-500">•</span>
                                            <span class="text-xs text-gray-500">5時間前</span>
                                        </div>
                                        <div class="text-xs text-gray-600 mb-2">
                                            作品「現代魔法使いの日常」へのコメント
                                        </div>
                                        <p class="text-sm text-gray-700">主人公の成長が丁寧に描かれていて感動しました。次回更新も待っています！</p>
                                    </div>
                                </div>
                            </div>

                            <div class="border-b border-gray-200 pb-4">
                                <div class="flex items-start space-x-3">
                                    <div class="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center">
                                        <i class="fas fa-user text-gray-600 text-sm"></i>
                                    </div>
                                    <div class="flex-1">
                                        <div class="flex items-center space-x-2 mb-1">
                                            <span class="font-medium text-sm text-gray-800">ファンタジー好き</span>
                                            <span class="text-xs text-gray-500">•</span>
                                            <span class="text-xs text-gray-500">1日前</span>
                                        </div>
                                        <div class="text-xs text-gray-600 mb-2">
                                            作品「魔法学園の恋愛事件簿」へのコメント
                                        </div>
                                        <p class="text-sm text-gray-700">世界観の設定がとても細かくて読み応えがあります。ありがとうございます！</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-6">
                            <a href="/author/messages" class="text-gray-800 hover:text-gray-600 font-semibold text-sm">
                                すべてのメッセージを見る <i class="fas fa-arrow-right ml-1"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-lg shadow-sm p-6 mt-8">
                <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <i class="fas fa-bolt text-gray-600 mr-2"></i>
                    クイックアクション
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <a href="/author/works/new" class="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition duration-300">
                        <div class="bg-blue-100 p-3 rounded-full mr-4">
                            <i class="fas fa-plus text-blue-600"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold text-gray-800">新しい作品</h3>
                            <p class="text-sm text-gray-600">作品を投稿する</p>
                        </div>
                    </a>

                    <a href="/author/blogs/new" class="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition duration-300">
                        <div class="bg-green-100 p-3 rounded-full mr-4">
                            <i class="fas fa-blog text-green-600"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold text-gray-800">ブログ投稿</h3>
                            <p class="text-sm text-gray-600">日記を書く</p>
                        </div>
                    </a>

                    <a href="/author/setting" class="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition duration-300">
                        <div class="bg-purple-100 p-3 rounded-full mr-4">
                            <i class="fas fa-cog text-purple-600"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold text-gray-800">設定</h3>
                            <p class="text-sm text-gray-600">プロフィール編集</p>
                        </div>
                    </a>

                    <a href="/author/messages" class="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition duration-300">
                        <div class="bg-orange-100 p-3 rounded-full mr-4">
                            <i class="fas fa-envelope text-orange-600"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold text-gray-800">メッセージ</h3>
                            <p class="text-sm text-gray-600">読者との交流</p>
                        </div>
                    </a>
                </div>
            </div>
        </main>
    );
}