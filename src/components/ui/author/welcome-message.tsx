interface WelcomeMessageProps {
    authorName?: string;
    message?: string;
}

export default function WelcomeMessage({ 
    authorName = "unknown", 
    message = "今日も素晴らしい作品を世界に届けましょう！" 
}: WelcomeMessageProps) {
    return (
        <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 class="lg:text-3xl sm:text-2xl font-bold text-gray-800 mb-2">
                おかえりなさい、{authorName}さん
            </h1>
            <p class="text-gray-600">
                {message}
            </p>
        </div>
    );
}
