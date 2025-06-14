import { RoomResult } from "@/interfaces/messages";
import { formatJST } from "@/utils/timestamp";

interface MessageSelectProps {
    roomDetails: RoomResult;
}

export default function MessageSelect({ roomDetails }: MessageSelectProps) {
    const { room, messages } = roomDetails;
    const lastMessage = messages[messages.length - 1] ?? { text: "メッセージ未受信", created_at: room.created_at };

    return (
        <a href={`/author/messages/${room.slug}`}>
            <div className="mt-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300 cursor-pointer">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-500">👤</span>
                        </div>
                        <div>
                            <div className="font-medium text-gray-700 text-sm sm:text-base truncate max-w-[200px] sm:max-w-xs">
                                { room.title }
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-[200px] sm:max-w-xs">
                                最新メッセージ: { lastMessage.text.length > 10 ? lastMessage.text.slice(0, 10) + "..." : lastMessage.text }
                            </div>
                        </div>
                    </div>
                    <div className="text-xs text-gray-400 sm:text-sm whitespace-nowrap">
                        { formatJST(parseInt(lastMessage.created_at)) }
                    </div>
                </div>
            </div>
        </a>
    );
}