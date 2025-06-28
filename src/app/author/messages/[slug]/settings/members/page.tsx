export default function MessageMemberControl() {
    return (
        <main class="p-5 w-full">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <div class="flex items-center space-x-3 mb-2">
                        <a href="/author/messages" class="text-gray-500 hover:text-gray-700 transition duration-300">
                            <i class="fas fa-arrow-left"></i>
                        </a>
                        <h1 class="text-3xl font-bold text-gray-800">メンバー管理</h1>
                    </div>
                    <p class="text-gray-600">チャットルーム「【秋刀魚さん】ネタ考案所」のメンバーを管理します</p>
                </div>
                <div class="flex items-center space-x-3">
                    <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300" id="invite-member-btn">
                        <i class="fas fa-user-plus mr-2"></i>メンバー招待
                    </button>
                    <button class="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition duration-300" id="room-settings-btn">
                        <i class="fas fa-cog mr-2"></i>ルーム設定
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex items-center">
                        <div class="bg-blue-100 p-3 rounded-full">
                            <i class="fas fa-users text-blue-600 text-xl"></i>
                        </div>
                        <div class="ml-4">
                            <h3 class="text-2xl font-bold text-gray-800">8</h3>
                            <p class="text-gray-600 text-sm">総メンバー数</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex items-center">
                        <div class="bg-green-100 p-3 rounded-full">
                            <i class="fas fa-user-shield text-green-600 text-xl"></i>
                        </div>
                        <div class="ml-4">
                            <h3 class="text-2xl font-bold text-gray-800">2</h3>
                            <p class="text-gray-600 text-sm">管理者</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex items-center">
                        <div class="bg-orange-100 p-3 rounded-full">
                            <i class="fas fa-clock text-orange-600 text-xl"></i>
                        </div>
                        <div class="ml-4">
                            <h3 class="text-2xl font-bold text-gray-800">5</h3>
                            <p class="text-gray-600 text-sm">アクティブ（今日）</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div class="flex-1 max-w-md">
                        <div class="relative">
                            <input type="text" placeholder="メンバーを検索..." class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i class="fas fa-search text-gray-400"></i>
                                </div>
                        </div>
                    </div>
                    <div class="flex items-center space-x-3">
                        <select class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>すべての権限</option>
                            <option>管理者</option>
                            <option>モデレーター</option>
                            <option>一般メンバー</option>
                        </select>
                        <select class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>すべてのステータス</option>
                            <option>オンライン</option>
                            <option>離席中</option>
                            <option>オフライン</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-lg shadow-sm">
                <div class="p-6 border-b border-gray-200">
                    <h2 class="text-xl font-bold text-gray-800">メンバー一覧</h2>
                </div>
                <div class="p-6">
                    <div class="space-y-4">
                        <div class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition duration-300">
                            <div class="flex items-center space-x-4">
                                <div class="relative">
                                    <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                        <span class="text-white font-semibold text-lg">田</span>
                                    </div>
                                    <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div>
                                    <div class="flex items-center space-x-2">
                                        <h4 class="font-semibold text-gray-800">tanahiro2010</h4>
                                        <span class="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                            <i class="fas fa-crown mr-1"></i>管理者
                                        </span>
                                        <span class="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">開発者</span>
                                    </div>
                                    <div class="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                        <span><i class="fas fa-calendar mr-1"></i>参加日: 2024/01/15</span>
                                        <span><i class="fas fa-comments mr-1"></i>156 メッセージ</span>
                                        <span class="text-green-600"><i class="fas fa-circle mr-1"></i>オンライン</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center space-x-2">
                                <button class="text-gray-600 hover:text-gray-800 p-2" title="プロフィール表示">
                                    <i class="fas fa-user"></i>
                                </button>
                                <button class="text-gray-600 hover:text-gray-800 p-2" title="メッセージ履歴">
                                    <i class="fas fa-history"></i>
                                </button>
                                <div class="relative">
                                    <button class="text-gray-600 hover:text-gray-800 p-2" title="その他の操作">
                                        <i class="fas fa-ellipsis-v"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition duration-300">
                            <div class="flex items-center space-x-4">
                                <div class="relative">
                                    <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                                        <span class="text-white font-semibold text-lg">秋</span>
                                    </div>
                                    <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div>
                                    <div class="flex items-center space-x-2">
                                        <h4 class="font-semibold text-gray-800">秋刀魚さん</h4>
                                        <span class="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            <i class="fas fa-shield-alt mr-1"></i>モデレーター
                                        </span>
                                        <span class="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">作家</span>
                                    </div>
                                    <div class="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                        <span><i class="fas fa-calendar mr-1"></i>参加日: 2024/02/20</span>
                                        <span><i class="fas fa-comments mr-1"></i>89 メッセージ</span>
                                        <span class="text-yellow-600"><i class="fas fa-circle mr-1"></i>離席中</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center space-x-2">
                                <button class="text-gray-600 hover:text-gray-800 p-2" title="プロフィール表示">
                                    <i class="fas fa-user"></i>
                                </button>
                                <button class="text-gray-600 hover:text-gray-800 p-2" title="メッセージ履歴">
                                    <i class="fas fa-history"></i>
                                </button>
                                <div class="relative">
                                    <button class="text-gray-600 hover:text-gray-800 p-2 member-menu-btn" title="その他の操作">
                                        <i class="fas fa-ellipsis-v"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition duration-300">
                            <div class="flex items-center space-x-4">
                                <div class="relative">
                                    <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                                        <span class="text-white font-semibold text-lg">猫</span>
                                    </div>
                                    <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div>
                                    <div class="flex items-center space-x-2">
                                        <h4 class="font-semibold text-gray-800">猫さん</h4>
                                        <span class="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">一般メンバー</span>
                                    </div>
                                    <div class="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                        <span><i class="fas fa-calendar mr-1"></i>参加日: 2024/03/10</span>
                                        <span><i class="fas fa-comments mr-1"></i>234 メッセージ</span>
                                        <span class="text-green-600"><i class="fas fa-circle mr-1"></i>オンライン</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center space-x-2">
                                <button class="text-gray-600 hover:text-gray-800 p-2" title="プロフィール表示">
                                    <i class="fas fa-user"></i>
                                </button>
                                <button class="text-gray-600 hover:text-gray-800 p-2" title="メッセージ履歴">
                                    <i class="fas fa-history"></i>
                                </button>
                                <div class="relative">
                                    <button class="text-gray-600 hover:text-gray-800 p-2 member-menu-btn" title="その他の操作">
                                        <i class="fas fa-ellipsis-v"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition duration-300">
                            <div class="flex items-center space-x-4">
                                <div class="relative">
                                    <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                                        <span class="text-white font-semibold text-lg">読</span>
                                    </div>
                                    <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div>
                                    <div class="flex items-center space-x-2">
                                        <h4 class="font-semibold text-gray-800">読者123</h4>
                                        <span class="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">一般メンバー</span>
                                    </div>
                                    <div class="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                        <span><i class="fas fa-calendar mr-1"></i>参加日: 2024/04/05</span>
                                        <span><i class="fas fa-comments mr-1"></i>45 メッセージ</span>
                                        <span class="text-gray-500"><i class="fas fa-circle mr-1"></i>3時間前</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center space-x-2">
                                <button class="text-gray-600 hover:text-gray-800 p-2" title="プロフィール表示">
                                    <i class="fas fa-user"></i>
                                </button>
                                <button class="text-gray-600 hover:text-gray-800 p-2" title="メッセージ履歴">
                                    <i class="fas fa-history"></i>
                                </button>
                                <div class="relative">
                                    <button class="text-gray-600 hover:text-gray-800 p-2 member-menu-btn" title="その他の操作">
                                        <i class="fas fa-ellipsis-v"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition duration-300">
                            <div class="flex items-center space-x-4">
                                <div class="relative">
                                    <div class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center">
                                        <span class="text-white font-semibold text-lg">作</span>
                                    </div>
                                    <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div>
                                    <div class="flex items-center space-x-2">
                                        <h4 class="font-semibold text-gray-800">作家の卵</h4>
                                        <span class="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">一般メンバー</span>
                                        <span class="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">作家</span>
                                    </div>
                                    <div class="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                        <span><i class="fas fa-calendar mr-1"></i>参加日: 2024/05/12</span>
                                        <span><i class="fas fa-comments mr-1"></i>78 メッセージ</span>
                                        <span class="text-green-600"><i class="fas fa-circle mr-1"></i>オンライン</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center space-x-2">
                                <button class="text-gray-600 hover:text-gray-800 p-2" title="プロフィール表示">
                                    <i class="fas fa-user"></i>
                                </button>
                                <button class="text-gray-600 hover:text-gray-800 p-2" title="メッセージ履歴">
                                    <i class="fas fa-history"></i>
                                </button>
                                <div class="relative">
                                    <button class="text-gray-600 hover:text-gray-800 p-2 member-menu-btn" title="その他の操作">
                                        <i class="fas fa-ellipsis-v"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                        <div class="text-sm text-gray-600">
                            8人中 1-5人を表示
                        </div>
                        <div class="flex items-center space-x-2">
                            <button class="px-3 py-2 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <button class="px-3 py-2 bg-blue-600 text-white rounded-lg">1</button>
                            <button class="px-3 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
                            <button class="px-3 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}