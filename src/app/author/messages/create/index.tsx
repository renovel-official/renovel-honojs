import AuthorTitle from "@/components/ui/author/title";

export default function AuthorMessagesCreate() {
    return (
        <main className="p-4 sm:p-8 md:p-10 lg:p-12 w-full flex justify-center">
            <div className="w-full max-w-3xl">
                <AuthorTitle>メッセージを作成</AuthorTitle>

                <div className="mt-6 w-full border rounded p-4 sm:p-6 bg-white">
                    <p className="text-gray-500 text-center">
                        メッセージを作成するユーザーのIDを入力してください
                    </p>

                    <div className="mt-5">
                        <div id="user-list" className="text-center w-full"></div>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3">
                        <input
                            type="text"
                            id="user-id"
                            placeholder="ユーザーID"
                            className="w-full sm:w-72 border rounded p-2 text-gray-500"
                        />
                        <button
                            id="search-user-button"
                            className="w-full sm:w-auto px-4 py-2 border rounded text-gray-600 hover:bg-gray-100 transition"
                        >
                            追加
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <input
                            type="text"
                            id="message-title"
                            placeholder="メッセージルームのタイトル"
                            className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 border rounded p-2 text-gray-500"
                        />
                    </div>

                    <div className="mt-6 text-center">
                        <button
                            id="create-message-button"
                            className="w-full sm:w-auto px-6 py-2 border rounded text-gray-600 hover:bg-gray-100 transition"
                        >
                            メッセージを作成
                        </button>
                    </div>
                </div>
            </div>

            <script src="/assets/service/author/messages/create.default.js"></script>
        </main>
    );
}
