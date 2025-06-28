import AuthorTitle from "@/components/ui/author/title";
import MemberBlock from "@/components/ui/author/messages/settings/member";
import User from "@/interfaces/user";
import { RoomResult } from "@/interfaces/messages";


interface MessageSettingsProps {
    room: RoomResult;
    user: User;
}

export default function MessageSettings({ room, user }: MessageSettingsProps) {
    const sortedMembers = room.users.sort((a, b) => {
        // 管理者順（true → false）
        if (b.is_admin !== a.is_admin) {
          return b.is_admin - a.is_admin;
        }
      
        // created_at（古い順）
        return parseInt(a.created_at) - parseInt(b.created_at);
      }).slice(0, 10);

    return (
        <main class="p-5 w-full">
            <div class="flex items-center justify-between mb-6">
                <AuthorTitle>
                    <div>
                        <a href={`/author/messages/${room.room.slug}`} class="text-gray-600 hover:text-gray-800 transition duration-300">
                            <i class="fas fa-arrow-left text-lg"></i>
                        </a>

                        ルーム設定
                    </div>
                </AuthorTitle>
                <div class="bg-blue-50 px-3 py-1 rounded-full">
                    <span class="text-blue-600 text-sm font-medium">
                        <i class="fas fa-users mr-1"></i>
                        { room.room.title }
                    </span>
                </div>
            </div>

            <div class="space-y-6">
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex items-center mb-4">
                        <div class="bg-blue-100 p-2 rounded-full mr-3">
                            <i class="fas fa-edit text-blue-600"></i>
                        </div>
                        <h2 class="text-xl font-bold text-gray-800">ルーム名</h2>
                    </div>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">ルーム名</label>
                            <input type="text"
                                value={room.room.title}
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="ルーム名を入力" />
                        </div>
                        <div class="flex justify-end">
                            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                                <i class="fas fa-save mr-1"></i>保存
                            </button>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex items-center mb-4">
                        <div class="bg-green-100 p-2 rounded-full mr-3">
                            <i class="fas fa-users text-green-600"></i>
                        </div>
                        <h2 class="text-xl font-bold text-gray-800">メンバー管理</h2>
                    </div>
                    <div class="space-y-4">
                        <div class="space-y-3">
                            { sortedMembers.map((member) => {
                                return <MemberBlock me={user.slug} username={member.user_id} role={member.is_admin}/>
                            }) }
                        </div>


                        <div class="border-t pt-4">
                            <div class="flex space-x-3">
                                <input type="text"
                                    placeholder="ユーザー名を入力"
                                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                    <button class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
                                        <i class="fas fa-plus mr-1"></i>追加
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex items-center mb-4">
                        <div class="bg-orange-100 p-2 rounded-full mr-3">
                            <i class="fas fa-history text-orange-600"></i>
                        </div>
                        <h2 class="text-xl font-bold text-gray-800">メッセージログ削除</h2>
                    </div>
                    <div class="space-y-4">
                        <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <div class="flex items-start space-x-3">
                                <i class="fas fa-exclamation-triangle text-orange-600 mt-1"></i>
                                <div>
                                    <h3 class="font-medium text-orange-800 mb-1">注意事項</h3>
                                    <p class="text-sm text-orange-700">
                                        削除されたメッセージは復元できません。慎重に操作してください。
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="border rounded-lg p-4">
                                <h3 class="font-medium text-gray-800 mb-2">期間指定削除</h3>
                                <div class="space-y-3">
                                    <div>
                                        <label class="block text-sm text-gray-600 mb-1">開始日</label>
                                        <input type="date" class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label class="block text-sm text-gray-600 mb-1">終了日</label>
                                        <input type="date" class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <button class="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition duration-300">
                                        期間指定削除
                                    </button>
                                </div>
                            </div>

                            <div class="border rounded-lg p-4">
                                <h3 class="font-medium text-gray-800 mb-2">全ログ削除</h3>
                                <p class="text-sm text-gray-600 mb-4">
                                    このルームの全てのメッセージログを削除します。
                                </p>
                                <button class="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300"
                                    onclick="confirmDeleteAllLogs()">
                                    全ログ削除
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex items-center mb-4">
                        <div class="bg-red-100 p-2 rounded-full mr-3">
                            <i class="fas fa-trash text-red-600"></i>
                        </div>
                        <h2 class="text-xl font-bold text-gray-800">ルーム削除</h2>
                    </div>
                    <div class="space-y-4">
                        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div class="flex items-start space-x-3">
                                <i class="fas fa-exclamation-circle text-red-600 mt-1"></i>
                                <div>
                                    <h3 class="font-medium text-red-800 mb-1">危険な操作</h3>
                                    <p class="text-sm text-red-700">
                                        ルームを削除すると、全てのメッセージとメンバー情報が完全に削除されます。この操作は取り消せません。
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="border rounded-lg p-4">
                            <h3 class="font-medium text-gray-800 mb-3">削除の確認</h3>
                            <div class="space-y-3">
                                <div>
                                    <label class="block text-sm text-gray-600 mb-2">
                                        削除を確認するために「<span class="font-medium">削除</span>」と入力してください
                                    </label>
                                    <input type="text"
                                        placeholder="削除"
                                        id="deleteConfirmation"
                                        class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500" />
                                </div>
                                <button class="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    id="deleteRoomBtn"
                                    disabled
                                    onclick="confirmDeleteRoom()">
                                    <i class="fas fa-trash mr-1"></i>ルームを削除
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}