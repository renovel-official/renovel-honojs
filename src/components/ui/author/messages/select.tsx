import { RoomResult } from "@/interfaces/messages";

interface MessageSelectProps {
    roomDetails: RoomResult;
}

export default function MessageSelect({ roomDetails }: MessageSelectProps) {
    const { room, messages } = roomDetails;
    const lastMessage = messages[messages.length - 1];

    return (
        <a href={`/author/messages/${room.slug}`}>
            <div class="mt-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300 cursor-pointer">
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span class="text-gray-500">👤</span>
                        </div>
                        <div>
                            <div class="font-medium text-gray-700">{room.title}</div>
                            <div class="text-sm text-gray-500">最新メッセージ: {lastMessage.text.slice(0, 10)}</div>
                        </div>
                    </div>
                    <div class="text-sm text-gray-400">
                        {lastMessage.created_at}
                    </div>
                </div>
            </div>
        </a>

    )
}