interface HeadProps {
    host: string;
    title?: string | undefined;
    description?: string | undefined;
    image?: string | undefined;
}

export default function Head({ host, title, description, image }: HeadProps) {
    return (
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <title>{ title ?? "ReNovel | 小説家の卵を発掘する小説投稿サイト"}</title>
            <meta property="og:title" content={title ?? "ReNovel | 学生運営の小説投稿サイト"} />
            <meta property="og:description" content={description ?? "ReNovelは、新しい才能を発掘する小説投稿サイトです。あなたの物語を世界に届けましょう。"} />
            <meta property="og:image" content={image ?? `${host}/renovel_ogp.png`} />
            <meta property="og:type" content="website" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
            <script src="https://cdn.tailwindcss.com"></script>

            <meta name="description" content={description ?? "ReNovelは、新しい才能を発掘する小説投稿サイトです。あなたの物語を世界に届けましょう。"} />
            <meta property="og:title" content={title ?? "ReNovel | 小説家の卵を発掘する小説投稿サイト"} />
            <meta property="og:description" content={description ?? "ReNovelは、新しい才能を発掘する小説投稿サイトです。あなたの物語を世界に届けましょう。"} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={host + '/'} />
            <meta property="og:image" content={host + '/renovel_ogp.png'} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content="ReNovelのOGP" />

            <meta name="author" content="ReNovel運営" />
            <meta name="publisher" content="ReNovel" />
            <meta name="keywords" content="小説,投稿,学生,作家,ReNovel,文学,創作,小説投稿サイト,無料,Web小説,ライトノベル,二次創作" />
            <meta property="og:locale" content="ja_JP" />
            <meta property="og:site_name" content="ReNovel" />
            <meta name="twitter:creator" content="@ReNovel" />
            <link rel="canonical" href={host + '/'} />
            <link rel="alternate" hreflang="ja" href={host + '/'} />
            <link rel="sitemap" type="application/xml" title="Sitemap" href={host + '/sitemap.xml'} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@ReNovel" />
            <meta name="twitter:title" content={title ?? "ReNovel | 小説家の卵を発掘する小説投稿サイト"} />
            <meta name="twitter:description" content={description ?? "ReNovelは、新しい才能を発掘する小説投稿サイトです。あなたの物語を世界に届けましょう。"} />
            <meta name="twitter:image" content={host + '/renovel_ogp.png'} />
            <meta name="robots" content="index, follow" />
            <link rel="icon" href="/favicon.ico" />

            {/* Apple用metaタグ */}
            <link rel="apple-touch-icon" sizes="180x180" href={host + '/icon.png'} />
            <link rel="apple-touch-startup-image" href={host + '/renovel_ogp.png'} />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content={title ?? "ReNovel"} />

            <script src="/assets/service/utils.js"></script>
        </head>
    )
}