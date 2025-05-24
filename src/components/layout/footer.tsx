import Link from '@/components/ui/footer/link';

export default function Footer() {
    return (
        <footer class="bg-gray-800 text-white py-8 mt-12">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                        <h4 class="text-lg font-bold mb-4">NovelHub</h4>
                        <p class="text-gray-400 text-sm">
                            作家と読者をつなぐ小説投稿プラットフォーム
                        </p>
                    </div>
                    <div>
                        <h5 class="font-semibold mb-3">サービス</h5>
                        <ul class="space-y-2 text-sm text-gray-400">
                            <li><Link href="/">小説を読む</Link></li>
                            <li><Link href="/">作品投稿</Link></li>
                            <li><Link href="/">ランキング</Link></li>
                            <li><Link href="/">コンテスト</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5 class="font-semibold mb-3">サポート</h5>
                        <ul class="space-y-2 text-sm text-gray-400">
                            <li><Link href="/">ヘルプ</Link></li>
                            <li><Link href="/">利用規約</Link></li>
                            <li><Link href="/">プライバシーポリシー</Link></li>
                            <li><Link href="/">お問い合わせ</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5 class="font-semibold mb-3">フォロー</h5>
                        <div class="flex space-x-3">
                            <Link href="/">
                                <i class="fab fa-twitter text-xl"></i>
                            </Link>
                            <Link href="/">
                                <i class="fab fa-facebook text-xl"></i>
                            </Link>
                            <Link href="/">
                                <i class="fab fa-instagram text-xl"></i>
                            </Link>
                        </div>
                    </div>
                </div>
                <div class="border-t border-gray-700 mt-6 pt-6 text-center text-sm text-gray-400">
                    <p>&copy; 2024 NovelHub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}