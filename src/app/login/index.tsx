import { Input, SubmitButton } from "@/components/ui/utils/account";
import Link from "@/components/ui/utils/link";

interface LoginProps {
    error: string | undefined;
}

export default function Login({ error }: LoginProps) {
    return (
        <main class="min-h-[calc(100vh-64px)] flex flex-col justify-center items-center text-center">
            <div class="text-3xl font-bold">
                ログイン
            </div>

            <div class="mt-5 w-full max-w-md">
                <form action="/api/v1/login" method="post">
                    <div class="hidden">
                        <input type="hidden" name="location" value={`/author`} />
                        <input type="hidden" name="origin" value={`/login`} />
                    </div>

                    { error && (
                        <div class="w-full border border-red-500 rounded-md p-1">
                            <div className="text-2xl">
                                Error
                            </div>

                            <div className="mt-1">
                                { error }
                            </div>
                        </div>
                    )}

                    <div>
                        <Input name="email" type="email" placeholder="メールアドレス" />
                        <Input name="password" type="password" placeholder="パスワード" />
                    </div>

                    <div class="mt-5 border-t border-gray-300 flex justify-between items-center">
                        <Link href="/register">または、新規登録</Link>
                        <SubmitButton className="w-1/2 mt-5">ログイン</SubmitButton>
                    </div>

                    <div class="h-10" />
                </form>
            </div>
        </main>
    )
}
