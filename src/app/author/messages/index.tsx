import MessageSelect from "@/components/ui/author/messages/select";
import AuthorTitle from "@/components/ui/author/title";
import { RoomResult } from "@/interfaces/messages";

interface AuthorMessagesProps {
    rooms: Array<RoomResult>;
}

export default function AuthorMessages({ rooms }: AuthorMessagesProps) {
    return (
        <main class="p-5 w-full">
            <AuthorTitle>メッセージ</AuthorTitle>

            <div class="mt-5 w-full border rounded p-3">
                {rooms.length === 0 ? (
                    <div>
                        <div class="text-gray-500 text-center">
                            メッセージはまだありません
                        </div>
                    </div>

                ) : (
                    rooms.map((room: RoomResult) => {
                        return (
                            <MessageSelect roomDetails={room} />
                        );
                    })
                )}
            
                <div class="mt-5 text-center">
                    <a href="/author/messages/new">
                        <button class="border border-gray-300 text-gray-500 px-4 py-2 rounded hover:bg-gray-200 transition duration-300">
                            新規メッセージ
                        </button>
                    </a>
                </div>
            </div>
        </main>
    );
}