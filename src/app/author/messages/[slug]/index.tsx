import MessageLog from "@/components/ui/author/messages/message";
import AuthorTitle from "@/components/ui/author/title";
import { Message, RoomResult } from "@/interfaces/messages";
import { Settings } from "@/components/icons/google-icons";

interface AuthorMessagesRoomProps {
    detail: RoomResult;
    userId: string;
}

export default function AuthorMessagesRoom({ detail, userId }: AuthorMessagesRoomProps) {
    const { room, messages } = detail;
    const user = detail.users.find((user) => user.user_id == userId) ?? { is_admin: 0 };

    return (
        <main class="flex flex-col h-screen bg-white p-0 sm:p-5 rounded-md">
            <div class="p-2 sm:p-0">
                <AuthorTitle>
                    <div class="flex items-center justify-between w-full">
                        <div class="text-sm sm:text-base font-medium text-gray-800 truncate flex-1">
                            {room.title}
                        </div>

                        <div class="flex-shrink-0 ml-2 flex items-center space-x-1">
                            <button
                                class="flex items-center px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:text-black hover:border-gray-400 transition focus:outline-none"
                                title="通話を始める"
                                id="start-meeting"
                            >
                                <span class="text-lg">📞</span>
                                <span class="ml-1 hidden sm:inline">通話</span>
                            </button>
                            {user?.is_admin >= 1 ? (
                                <a href={`/author/messages/${room.slug}/setting`} class="block p-2">
                                    <Settings className="text-gray-600 hover:text-black w-5 h-5 sm:w-6 sm:h-6" />
                                </a>
                            ) : null}
                        </div>
                    </div>
                </AuthorTitle>
            </div>

            <div class="flex-1 overflow-y-auto px-2 sm:px-4 py-2" id="message-log">
                {messages.length === 0 ? (
                    <div class="text-center text-gray-500 mt-8 sm:mt-10 px-4">
                        <div class="text-lg sm:text-xl lg:text-2xl mb-2">チャットルーム 「{room.title}」へようこそ</div>
                        <div class="text-xs sm:text-sm">好きな小説、好きなアニメ、作家さん、なんでも好きな雑談を始めましょう</div>
                    </div>
                ) : (
                    messages.map((message: Message) => {
                        const isAuthor = message.author_id === userId;
                        return (
                            <MessageLog
                                key={message.id}
                                icon={isAuthor ? "👤" : "👥"}
                                message={message}
                            />
                        );
                    })
                )}
            </div>

            <div class="bg-white border-t border-gray-300 px-2 sm:px-4 py-2 sm:py-3 sticky bottom-0 w-full">
                <div class="max-w-4xl mx-auto flex items-end space-x-2 sm:space-x-3">
                    <textarea
                        id="message"
                        placeholder="メッセージを入力..."
                        class="flex-1 border border-gray-300 rounded-lg px-2 sm:px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-gray-400 text-base min-h-[40px] max-h-[120px]"
                        rows={1}
                        style="font-size: 16px;"
                    />
                    <button class="bg-gray-800 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-700 transition text-base flex-shrink-0 h-[40px] sm:h-auto" id="send">
                        <span class="hidden sm:inline">送信</span>
                        <span class="sm:hidden">📤</span>
                    </button>
                </div>
            </div>

            <script src="/assets/service/libs/webrtc.js" defer></script>
            <script src="/assets/service/author/messages/chat.default.js" defer></script>
        </main>
    );
}