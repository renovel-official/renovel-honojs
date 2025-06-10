import AuthorTitle from "@/components/ui/author/title";

export default function AuthorMessagesCreate() {
    return (
        <main class="p-5 w-full">
            <AuthorTitle>メッセージを作成</AuthorTitle>

            <div class="mt-5 w-full border rounded p-3">
                <form id="user-add-form">
                    <div class="text-gray-500 text-center">
                        メッセージを作成するユーザーのIDを入力してください
                    </div>

                    <div class="mt-5 text-center">
                        <input type="text" class="w-1/2 border rounded p-2" placeholder="ユーザーID" id="user-id" />
                    </div>
                </form>
            </div>
        </main>
    );
}