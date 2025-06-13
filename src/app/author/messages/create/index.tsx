import AuthorTitle from "@/components/ui/author/title";

export default function AuthorMessagesCreate() {
    return (
        <main class="p-5 w-full">
            <AuthorTitle>メッセージを作成</AuthorTitle>

            <div class="mt-5 w-full border rounded p-3">
                <div class="text-gray-500 text-center">
                    メッセージを作成するユーザーのIDを入力してください
                </div>

                <div class="flex justify-center">
                    <div id="user-list" class="mt-5 text-center w-3/4"></div>
                </div>

                <div class="mt-5 text-center">
                    <input type="text" class="w-1/2 border rounded p-2 text-gray-500" placeholder="ユーザーID" id="user-id" />
                    <button id="search-user-button" class="ml-2 hover:bg-gray-300 px-4 py-2 rounded border text-gray-500">追加</button>
                </div>

                <div class="mt-5 text-center">
                    <input type="text" class="w-1/2 border rounded p-2 text-gray-500" placeholder="メッセージルームのタイトル" id="message-title" />
                </div>

                <div class="mt-5 text-center">
                    <button id="create-message-button" class="hover:bg-gray-300 px-4 py-2 rounded border text-gray-500">メッセージを作成</button>
                </div>
            </div>

            <script src="/assets/service/author/messages/create.default.js"></script>
        </main>
    );
}