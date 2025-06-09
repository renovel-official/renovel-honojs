import AuthorTitle from "@/components/ui/author/title";

export default function AuthorMessagesCreate() {
    return (
        <main class="p-5 w-full">
            <AuthorTitle>メッセージを作成</AuthorTitle>

            <div class="mt-5 w-full border rounded p-3">
                <div class="text-gray-500 text-center">
                    メッセージを作成するユーザーを選択してください
                </div>
            </div>
        </main>
    );
}