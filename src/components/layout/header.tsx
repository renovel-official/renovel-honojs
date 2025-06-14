import Link from '@/components/ui/header/link';

interface HeaderProps {
    login?: boolean;
}

export default function Header({ login = false }: HeaderProps) {
    return (
        <header class="bg-white shadow-md" id="header">
            <div class="container mx-auto px-4 py-3">
                <div class="flex items-center justify-between">
                    <a href="/" class="flex items-center text-2xl sm:text-3xl font-bold">
                        <img src="/icon.png" alt="ReNovel" width={40} height={40} class="mr-2" />
                        ReNovel
                    </a>

                    {/* PCナビ */}
                    <nav class="hidden md:flex space-x-6">
                        <Link href="/">ホーム</Link>
                        <Link href="/search">小説を探す</Link>
                        <Link href="/ranking">ランキング</Link>
                        <Link href="/new">新着作品</Link>
                        <Link href="/blog">運営ブログ</Link>
                    </nav>

                    {/* PCログイン */}
                    <div class="hidden md:flex items-center space-x-3">
                        {login ? (
                            <>
                                <a href="/author/works" class="text-gray-700 hover:text-gray-900 transition duration-300">
                                    作品一覧
                                </a>
                                <a href="/author" class="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition duration-300">
                                    ダッシュボード
                                </a>
                            </>
                        ) : (
                            <a href="/login" class="text-gray-700 hover:text-gray-900 transition duration-300">
                                ログイン
                            </a>
                        )}
                    </div>

                    {/* ハンバーガー */}
                    <button class="md:hidden text-2xl text-gray-700" id="mobile-menu-btn">
                        ☰
                    </button>
                </div>
            </div>

            {/* モバイルメニューオーバーレイ */}
            <div id="mobile-overlay" class="fixed inset-0 z-50 bg-black bg-opacity-50 hidden">
                <div class="absolute top-0 right-0 w-4/5 max-w-sm h-full bg-white shadow-lg p-5 flex flex-col space-y-4 animate-slide-in">
                    <button id="close-mobile-menu" class="self-end text-2xl text-gray-500 hover:text-gray-800">×</button>
                    <nav class="flex flex-col space-y-4 text-lg">
                        <Link href="/">ホーム</Link>
                        <Link href="/search">小説を探す</Link>
                        <Link href="/ranking">ランキング</Link>
                        <Link href="/new">新着作品</Link>
                        <Link href="/blog">運営ブログ</Link>

                        {login ? (
                            <>
                                <a href="/author/works" class="hover:text-gray-900">作品一覧</a>
                                <a href="/author" class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition">ダッシュボード</a>
                            </>
                        ) : (
                            <a href="/login" class="hover:text-gray-900">ログイン</a>
                        )}
                    </nav>
                </div>
            </div>

            <script src="/assets/service/header.js" defer></script>
        </header>
    );
}
