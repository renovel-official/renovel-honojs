import { NovelResult } from "@/interfaces/novel";

interface HomeProps {
    bestNovels: NovelResult[];
    newNovels: NovelResult[];
}

export default function Home({ bestNovels, newNovels }: HomeProps) {
    
    return (
        <main>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2 space-y-6">
                    <section class="bg-white rounded-lg shadow-sm p-4">
                        <h3 class="text-2xl font-bold mb-6 flex items-center">
                            <i class="fas fa-star text-gray-600 mr-2"></i>
                            おすすめ作品
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="border rounded-lg p-4 hover:shadow-md transition duration-300">
                                <img src="/api/placeholder/300/200" alt="小説カバー" class="w-full h-32 object-cover rounded mb-3" />
                                    <h4 class="font-semibold text-lg mb-2">魔法学園の日常</h4>
                                    <p class="text-gray-600 text-sm mb-2">現代ファンタジー</p>
                                    <p class="text-gray-700 text-sm mb-3">魔法と現実が交差する学園で繰り広げられる青春物語...</p>
                                    <div class="flex justify-between items-center text-sm text-gray-500">
                                        <span><i class="fas fa-user mr-1"></i>作者名</span>
                                        <span><i class="fas fa-eye mr-1"></i>12,345 views</span>
                                    </div>
                            </div>
                            <div class="border rounded-lg p-4 hover:shadow-md transition duration-300">
                                <img src="/api/placeholder/300/200" alt="小説カバー" class="w-full h-32 object-cover rounded mb-3" />
                                    <h4 class="font-semibold text-lg mb-2">星間戦争クロニクル</h4>
                                    <p class="text-gray-600 text-sm mb-2">SF・スペースオペラ</p>
                                    <p class="text-gray-700 text-sm mb-3">遥かな未来、銀河系を舞台にした壮大な戦争の物語...</p>
                                    <div class="flex justify-between items-center text-sm text-gray-500">
                                        <span><i class="fas fa-user mr-1"></i>作者名2</span>
                                        <span><i class="fas fa-eye mr-1"></i>8,912 views</span>
                                    </div>
                            </div>
                        </div>
                    </section>

                    <section class="bg-white rounded-lg shadow-md p-6">
                        <h3 class="text-2xl font-bold mb-6 flex items-center">
                            <i class="fas fa-clock text-gray-600 mr-2"></i>
                            新着作品
                        </h3>
                        <div class="space-y-4">
                            <div class="flex items-center space-x-4 p-3 border-b hover:bg-gray-50 transition duration-300">
                                <img src="/api/placeholder/80/60" alt="小説サムネイル" class="w-16 h-12 object-cover rounded" />
                                    <div class="flex-1">
                                        <h5 class="font-semibold mb-1">異世界転生した僕の冒険記</h5>
                                        <p class="text-sm text-gray-600 mb-1">ファンタジー・異世界</p>
                                        <div class="flex items-center text-xs text-gray-500">
                                            <span class="mr-3"><i class="fas fa-user mr-1"></i>新人作家A</span>
                                            <span><i class="fas fa-calendar mr-1"></i>2時間前</span>
                                        </div>
                                    </div>
                            </div>
                            <div class="flex items-center space-x-4 p-3 border-b hover:bg-gray-50 transition duration-300">
                                <img src="/api/placeholder/80/60" alt="小説サムネイル" class="w-16 h-12 object-cover rounded" />
                                    <div class="flex-1">
                                        <h5 class="font-semibold mb-1">恋する図書館司書</h5>
                                        <p class="text-sm text-gray-600 mb-1">現代恋愛・コメディ</p>
                                        <div class="flex items-center text-xs text-gray-500">
                                            <span class="mr-3"><i class="fas fa-user mr-1"></i>ロマンス作家B</span>
                                            <span><i class="fas fa-calendar mr-1"></i>5時間前</span>
                                        </div>
                                    </div>
                            </div>
                            <div class="flex items-center space-x-4 p-3 hover:bg-gray-50 transition duration-300">
                                <img src="/api/placeholder/80/60" alt="小説サムネイル" class="w-16 h-12 object-cover rounded" />
                                    <div class="flex-1">
                                        <h5 class="font-semibold mb-1">サイバーパンク探偵物語</h5>
                                        <p class="text-sm text-gray-600 mb-1">SF・サイバーパンク</p>
                                        <div class="flex items-center text-xs text-gray-500">
                                            <span class="mr-3"><i class="fas fa-user mr-1"></i>未来作家C</span>
                                            <span><i class="fas fa-calendar mr-1"></i>8時間前</span>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div class="text-center mt-6">
                            <a href="#" class="text-gray-800 hover:text-gray-600 font-semibold">
                                新着作品をもっと見る <i class="fas fa-arrow-right ml-1"></i>
                            </a>
                        </div>
                    </section>
                </div>

                <div class="space-y-6">
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h3 class="text-xl font-bold mb-4 flex items-center">
                            <i class="fas fa-trophy text-gray-600 mr-2"></i>
                            人気ランキング
                        </h3>
                        <div class="space-y-3">
                            <div class="flex items-center space-x-3">
                                <span class="bg-gray-800 text-white text-sm font-bold px-2 py-1 rounded">1</span>
                                <div class="flex-1">
                                    <h5 class="font-semibold text-sm">転生賢者の魔法学院</h5>
                                    <p class="text-xs text-gray-600">154,332 views</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-3">
                                <span class="bg-gray-600 text-white text-sm font-bold px-2 py-1 rounded">2</span>
                                <div class="flex-1">
                                    <h5 class="font-semibold text-sm">現代魔法使いの日常</h5>
                                    <p class="text-xs text-gray-600">128,901 views</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-3">
                                <span class="bg-gray-500 text-white text-sm font-bold px-2 py-1 rounded">3</span>
                                <div class="flex-1">
                                    <h5 class="font-semibold text-sm">宇宙海賊の冒険譚</h5>
                                    <p class="text-xs text-gray-600">98,765 views</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-3">
                                <span class="bg-gray-400 text-white text-sm font-bold px-2 py-1 rounded">4</span>
                                <div class="flex-1">
                                    <h5 class="font-semibold text-sm">恋愛コメディ学園物語</h5>
                                    <p class="text-xs text-gray-600">87,432 views</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-3">
                                <span class="bg-gray-400 text-white text-sm font-bold px-2 py-1 rounded">5</span>
                                <div class="flex-1">
                                    <h5 class="font-semibold text-sm">ミステリーカフェ事件簿</h5>
                                    <p class="text-xs text-gray-600">76,123 views</p>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-4">
                            <a href="#" class="text-gray-800 hover:text-gray-600 text-sm font-semibold">
                                ランキングを見る
                            </a>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h3 class="text-xl font-bold mb-4 flex items-center">
                            <i class="fas fa-newspaper text-gray-600 mr-2"></i>
                            運営ブログ
                        </h3>
                        <div class="space-y-4">
                            <article class="border-b pb-3">
                                <h5 class="font-semibold text-sm mb-1">
                                    <a href="#" class="hover:text-gray-600 transition duration-300">
                                        新機能「読者レビュー」を追加しました
                                    </a>
                                </h5>
                                <p class="text-xs text-gray-600 mb-2">2024年5月20日</p>
                                <p class="text-xs text-gray-700">作品にレビューを投稿できる機能を追加。作家と読者のコミュニケーションがより豊かに...</p>
                            </article>
                            <article class="border-b pb-3">
                                <h5 class="font-semibold text-sm mb-1">
                                    <a href="#" class="hover:text-gray-600 transition duration-300">
                                        月間小説コンテスト開催のお知らせ
                                    </a>
                                </h5>
                                <p class="text-xs text-gray-600 mb-2">2024年5月15日</p>
                                <p class="text-xs text-gray-700">今月のテーマは「時間旅行」。優秀作品には賞金と出版の機会が...</p>
                            </article>
                            <article>
                                <h5 class="font-semibold text-sm mb-1">
                                    <a href="#" class="hover:text-gray-600 transition duration-300">
                                        メンテナンス完了のご報告
                                    </a>
                                </h5>
                                <p class="text-xs text-gray-600 mb-2">2024年5月10日</p>
                                <p class="text-xs text-gray-700">サーバーメンテナンスが完了し、表示速度が大幅に向上しました...</p>
                            </article>
                        </div>
                        <div class="text-center mt-4">
                            <a href="#" class="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-900 transition duration-300">
                                <i class="fas fa-external-link-alt mr-1"></i>
                                運営ブログを見る
                            </a>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h3 class="text-xl font-bold mb-4 flex items-center">
                            <i class="fas fa-tags text-gray-600 mr-2"></i>
                            人気ジャンル
                        </h3>
                        <div class="flex flex-wrap gap-2">
                            <span class="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs">ファンタジー</span>
                            <span class="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs">現代恋愛</span>
                            <span class="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs">SF</span>
                            <span class="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs">異世界</span>
                            <span class="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs">ミステリー</span>
                            <span class="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs">学園</span>
                            <span class="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs">歴史</span>
                            <span class="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs">ホラー</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}