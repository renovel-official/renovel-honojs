import MessageLog from "@/components/ui/author/messages/message";
import AuthorTitle from "@/components/ui/author/title";
import { Message, RoomResult } from "@/interfaces/messages";

interface AuthorMessagesRoomProps {
    detail: RoomResult;
    userId: string;
}

export default function AuthorMessagesRoom({ detail, userId }: AuthorMessagesRoomProps) {
    const { room, messages } = detail;

    return (
        <main class="flex flex-col h-screen bg-white p-5 rounded-md">
            <AuthorTitle>{room.title}</AuthorTitle>

            <div class="flex-1 overflow-y-auto px-4 py-2" id="message-log">
                {messages.length === 0 ? (
                    <div class="text-center text-gray-500 mt-10">
                        <div class="text-xl sm:text-2xl mb-2">チャットルーム 「{ room.title }」へようこそ</div>
                        <div class="text-sm">好きな小説、好きなアニメ、作家さん、なんでも好きな雑談を始めましょう</div>
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

            <div class="bg-white border-t border-gray-300 px-4 py-3 sticky bottom-0 w-full">
                <div class="max-w-4xl mx-auto flex items-center space-x-2 sm:space-x-3">
                    <textarea
                        id="message"
                        placeholder="メッセージを入力..."
                        class="flex-1 border border-gray-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:text-base"
                        rows={1}
                    />
                    <button class="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition text-sm sm:text-base" id="send">
                        送信
                    </button>
                </div>
            </div>

            <script src="/assets/service/author/messages/chat.js" defer></script>
        </main>
    );
}