import { formatJST } from "@/utils/timestamp";
import { Message } from "@/interfaces/messages";

interface MessageLogProps {
    icon: string;
    message: Message;
}

export default function MessageLog({ icon, message }: MessageLogProps) {
    const { author_id, text, created_at } = message;

    return (
        <div className="flex items-start space-x-3 p-4 border-b border-gray-200">
            <div className="text-2xl">{ icon }</div>

            <div>
                <div className="flex items-baseline space-x-2">
                    <span className="font-semibold">{ author_id }</span>
                    <span className="text-xs text-gray-500">{ formatJST(parseInt(created_at)) }</span>
                </div>
                <div className="mt-1 text-gray-700">{ text }</div>
            </div>
        </div>
    );
}
