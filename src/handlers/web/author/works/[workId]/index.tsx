import { Context } from "hono";
import WorkControl from "@/app/author/works/[slug]";
import Env from "@/interfaces/utils/env";

export default async function workControllerHandler(c: Context<Env>) {
    const workId = c.req.param('workId');
    const novel = c.get('novel');
    const user = c.get('user');
    const work = await novel?.getNovel(workId);

    // 小説が存在しない場合、またはユーザーがログインしていない場合はリダイレクト
    if (!work) return c.redirect('/author/works');
    if (!user) return c.redirect('/login');

    // ユーザーが小説の作者でない場合、表示を拒否
    const isAuthor = work.authors.some(author => author.slug === user.slug);
    if (!isAuthor) return c.redirect(`/works/${workId}`);

    // ユーザーが小説の管理者でない場合、編集権限を無効化
    const editable = isAuthor && work.authors.some(author => author.slug === user.slug && author.is_admin);

    return c.render(
        <WorkControl 
            novelResult={work} 
            editable={editable}
        />
    )
}