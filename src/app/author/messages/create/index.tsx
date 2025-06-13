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

                    <div class="flex justify-center">
                        <div id="user-list" class="mt-5 text-center w-3/4"></div>
                    </div>

                    <div class="mt-5 text-center">
                        <input type="text" class="w-1/2 border rounded p-2" placeholder="ユーザーID" id="user-id" />
                    </div>
                </form>

                <div class="mt-5 text-center">
                    <button id="create-message-button" class="bg-blue-500 text-white px-4 py-2 rounded">メッセージを作成</button>
                </div>
            </div>

            <script src="/assets/service/author/messages/create.default.js"></script>
        </main>
    );
}