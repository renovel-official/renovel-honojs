import Link from '@/components/ui/header/link';

interface HeaderProps {
    login?: boolean;
}

export default function Header({ login = true }: HeaderProps) {
    return (
        <header class="bg-white shadow-md">
            <div class="container mx-auto px-4 py-3">
                <div class="flex items-center justify-between">
                    <a href="/">
                        <div class="flex items-center text-3xl font-bold">
                            <img src="/icon.png" alt="ReNovel" width={50} height={50} />
                            ReNovel
                        </div>
                    </a>

                    <nav class="hidden md:flex space-x-6">
                        <Link href="/">ホーム</Link>
                        <Link href="/search">小説を探す</Link>
                        <Link href="/ranking">ランキング</Link>
                        <Link href="/new">新着作品</Link>
                        <Link href="/blog">運営ブログ</Link>
                    </nav>
                    <div class="flex items-center space-x-3">
                        { login ? (
                            <>
                                <a href="/author/works" class="text-center bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition duration-300">
                                    作品一覧
                                </a>
                                <a href="/login" class="text-gray-700 hover:text-gray-900 transition duration-300">
                                    <i class="fas fa-user"></i>
                                    dashboard
                                </a>
                            </>
                        ) : (
                            <a href="/login" class="text-gray-700 hover:text-gray-900 transition duration-300">
                                <i class="fas fa-user"></i>
                                ログイン
                            </a>
                        ) }

                    </div>

                    <button class="md:hidden text-gray-700" id="mobile-menu-btn">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </div>
        </header>
    )
}