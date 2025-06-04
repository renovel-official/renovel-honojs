export default function Sidebar() {
    return (
        <div class="p-5 bg-white mt-6 ml-4 mb-6 rounded-md" id="sidebar">
            <nav class="space-y-4">
                <a href="/author" class="flex items-center p-3 rounded-lg bg-gray-800 text-white">
                    <i class="fas fa-tachometer-alt mr-3"></i>
                    ダッシュボード
                </a>
                <a href="/author/works" class="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-200 transition duration-300">
                    <i class="fas fa-book mr-3"></i>
                    作品管理
                </a>
                <a href="/author/blogs" class="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-200 transition duration-300">
                    <i class="fas fa-blog mr-3"></i>
                    ブログ管理
                </a>
                <a href="/author/messages" class="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-200 transition duration-300">
                    <i class="fas fa-envelope mr-3"></i>
                    メッセージ
                </a>
                <a href="/author/following-users" class="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-200 transition duration-300">
                    <i class="fas fa-users mr-3"></i>
                    フォロー管理
                </a>
                <a href="/author/setting" class="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-200 transition duration-300">
                    <i class="fas fa-cog mr-3"></i>
                    設定
                </a>
            </nav>

            <script src="/assets/service/author/sidebar.js"></script>
        </div>
    );
}