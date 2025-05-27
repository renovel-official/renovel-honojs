import { Hono } from "hono";
import Env from "@/interfaces/utils/env";

export default ((app: Hono<Env>) => {
    // Webルーティング
    app.get('/',);

    app.get('/works/:workId',);
    app.get('/works/:workId/episodes/:episodeId',);

    app.get('/users/:userId',);
    app.get('/users/:userId/about',);
    app.get('/users/:userId/works',);
    app.get('/users/:userId/blogs',);
    app.get('/users/:userId/blogs/:blogId',);
    app.get('/users/:userId/following-users',);
    app.get('/users/:userId/following-works',);

    app.get('/author',);

    app.get('/author/works',);
    app.get('/author/works/new',);
    app.get('/author/works/:workId',);
    app.get('/author/works/:workId/episodes/:episodeId',);

    app.get('/author/blogs',);
    app.get('/author/blogs/new',);
    app.get('/author/blogs/:blogId',);

    app.get('/author/following-users',);
    app.get('/author/following-works',);

    app.get('/author/messages',);
    app.get('/author/messages/:roomId',);

    app.get('/author/setting',);

    app.get('/search',);
    app.get('/ranking',);
    app.get('/blog',);
    app.get('/contact',);
    app.get('/terms',);
    app.get('/privacy',);
    app.get('/help',);
    app.get('/about',);
    app.get('/help',);
});