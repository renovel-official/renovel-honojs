import Input from "@/components/ui/author/works/input";
import { NovelGenreData } from "@/types/genre";

export default function CreateWork() {
    const genres = Object.entries(NovelGenreData);

    return (
        <main>
            <div class="bg-white rounded-lg shadow-sm p-6">
                <div class="mb-6">
                    <h2 class="text-2xl font-bold text-gray-800 mb-2">新しい作品を作成</h2>
                    <p class="text-gray-600">作品の基本情報を入力してください</p>
                </div>

                <div class="space-y-6">
                    {/* タイトル */}
                    <div>
                        <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
                            作品タイトル <span class="text-red-500">*</span>
                        </label>
                        <Input
                            id="title"
                            name="title"
                            maxLength={100}
                            placeholder="作品のタイトルを入力してください"
                            required
                        />
                        <p class="mt-1 text-sm text-gray-500">最大100文字まで</p>
                    </div>

                    {/* キャッチフレーズ */}
                    <div>
                        <label for="phrase" class="block text-sm font-medium text-gray-700 mb-2">
                            キャッチフレーズ <span class="text-red-500">*</span>
                        </label>
                        <Input
                            id="phrase"
                            required
                            maxLength={30}
                            placeholder="作品に関して何か一言"
                        />
                        <p class="mt-1 text-sm text-gray-500">最大30文字まで</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* ジャンル */}
                        <div>
                            <label for="genre" class="block text-sm font-medium text-gray-700 mb-2">
                                ジャンル <span class="text-red-500">*</span>
                            </label>
                            <select
                                id="genre"
                                name="genre"
                                required
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200"
                            >
                                <option value="">ジャンルを選択してください</option>
                                {genres.map(([key, label]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                        </div>

                        {/* 作品タイプ */}
                        <div>
                            <label for="type" class="block text-sm font-medium text-gray-700 mb-2">
                                作品タイプ <span class="text-red-500">*</span>
                            </label>
                            <select
                                id="type"
                                name="type"
                                required
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200"
                            >
                                <option value="">タイプを選択してください</option>
                                <option value="short">短編</option>
                                <option value="long">連載</option>
                            </select>
                        </div>
                    </div>

                    {/* タグ */}
                    <div>
                        <label for="tags" class="block text-sm font-medium text-gray-700 mb-2">
                            タグ
                        </label>
                        <Input
                            id="tags"
                            placeholder="カンマ区切りでタグを入力（例: 学園, 恋愛, ファンタジー）"
                        />
                        <p class="mt-1 text-sm text-gray-500">作品の特徴を表すタグをカンマ区切りで入力してください</p>
                    </div>

                    {/* あらすじ */}
                    <div>
                        <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
                            あらすじ
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={6}
                            maxlength={2000}
                            placeholder="作品のあらすじや概要を入力してください"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200 resize-vertical"
                        ></textarea>
                        <p class="mt-1 text-sm text-gray-500">最大2000文字まで</p>
                    </div>

                    {/* 本文（短編の場合） */}
                    <div id="text-section" class={"hidden"}>
                        <label for="text" class="block text-sm font-medium text-gray-700 mb-2">
                            本文
                        </label>
                        <div class="mb-2">
                            <p class="text-sm text-gray-500">
                                短編の場合はここに本文を入力してください。連載の場合は後でエピソードを追加できます。
                            </p>
                        </div>
                        <textarea
                            id="text"
                            name="text"
                            rows={20}
                            placeholder="作品の本文を入力してください"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200 resize-vertical font-mono"
                        ></textarea>
                        <p class="mt-1 text-sm text-gray-500">後から編集することもできます</p>
                    </div>

                    {/* アクションボタン */}
                    <div class="flex items-center justify-between pt-6 border-t border-gray-200">
                        <a
                            href="/author/works"
                            class="px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200"
                        >
                            キャンセル
                        </a>
                        <div class="flex space-x-3">
                            <button
                                type="submit"
                                name="action"
                                value="draft"
                                class="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-200 flex items-center"
                            >
                                <i class="fas fa-save mr-2"></i>
                                下書き保存
                            </button>
                            <button
                                type="submit"
                                name="action"
                                value="publish"
                                class="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition duration-200 flex items-center"
                            >
                                <i class="fas fa-upload mr-2"></i>
                                公開する
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <script src="/assets/service/works/app.js"></script>
        </main>
    )
}