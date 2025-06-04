import { Input, SubmitButton } from "@/components/ui/utils/account";
import Link from "@/components/ui/utils/link";

interface RegisterProps {
    error: string | undefined;
}

export default function Register({ error }: RegisterProps) {
    return (
        <main class="min-h-[calc(100vh-70px)] flex flex-col justify-center items-center text-center">
            <div class="text-3xl font-bold">
                新規登録
            </div>

            <div class="mt-5 w-full max-w-md">
                <form action="/api/v1/register" method="post">
                    <div class="hidden">
                        <input type="hidden" name="location" value={`/login`} />
                        <input type="hidden" name="origin" value={`/register`} />
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
                        <Input name="password_confirmation" type="password" placeholder="パスワード確認" />
                        <Input name="name" type="text" placeholder="名前" />
                        <Input name="slug" type="text" placeholder="ユーザー名" />
                    </div>

                    <div className="mt-2 flex items-center justify-center">
                        <input type="checkbox" name="agree_terms" id="agree" />
                        <label className="ml-2" for="agree">利用規約に同意する</label>
                    </div>

                    <div class="mt-5 border-t border-gray-300 flex justify-between items-center">
                        <Link href="/login">または、ログイン</Link>
                        <SubmitButton className="w-1/2 mt-5" disabled={false} color={true} id="register-button">新規登録</SubmitButton>
                    </div>

                    <div class="h-10" />
                </form>
            </div>

            <script src="/assets/service/register/main.js"></script>
        </main>
    )
}
