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
        <main class={`p-5 w-full`}>
            <AuthorTitle>{room.title}</AuthorTitle>

            <div className="mt-6">
                <div id="main" class="bg-white border border-gray-200 rounded-lg overflow-y-auto text-sm shadow-sm divide-y divide-gray-200 h-full flex-1 flex flex-col">
                    <div id="message-log">
                        {messages.length === 0 ? (
                            <div class={`p-5 text-gray-500`}>
                                <div className="text-3xl">
                                    メッセージがまだ送信されていません
                                </div>

                                <div class={`mt-2`}>
                                    小説、好きなアニメ、なんでも好きな雑談を始めましょう
                                </div>
                            </div>
                        ) : (
                            messages.forEach((message: Message) => {
                                const authorId = message.author_id;

                                return <MessageLog icon={message.author_id === authorId ? "👤" : "👥"} message={message} />
                            })
                        )}
                    </div>

                    <div class="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 px-4 py-2">
                        <div class="max-w-4xl mx-auto flex items-center space-x-3">
                            <textarea
                                type="text"
                                id="message"
                                placeholder="メッセージを入力..."
                                class="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                            <button class="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition" id="send">
                                送信
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <script src="/assets/service/author/messages/chat.js"></script>
        </main>
    )
}