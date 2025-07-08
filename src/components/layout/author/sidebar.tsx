import SidebarOption from "@/components/ui/author/sidebar-option";

export default function Sidebar() {
    return (
        <div class="p-5 bg-white mt-6 ml-4 mb-6 rounded-md" id="sidebar">
            <nav class="space-y-4">
                <SidebarOption href="/author" icon="fa-tachometer-alt" text="ダッシュボード" /> 
                <SidebarOption href="/author/works" icon="fa-book" text="作品管理" />
                <SidebarOption href="/author/blogs" icon="fa-blog" text="ブログ管理" />
                <SidebarOption href="/author/messages" icon="fa-envelope" text="メッセージ" />
                <SidebarOption href="/author/following-users" icon="fa-users" text="フォロー管理" />
                <SidebarOption href="/author/setting" icon="fa-cog" text="設定" />
                <SidebarOption href="/api/v1/logout?location=/" icon="fa-sign-out-alt" text="ログアウト" color="red" />
            </nav>

            <script src="/assets/service/author/sidebar.default.js"></script>
        </div>
    );
}