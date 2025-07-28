import { Hono } from "hono";
import authorMessagesCreateHandler from "./web/author/messages/create";
import messageRoomSettingHandler from "./web/author/messages/[roomId]/setting";
import authorMessagesHandler from "./web/author/messages";
import createWorkHandler from "./web/author/works/new";
import messageRoomHandler from "./web/author/messages/[roomId]";
import authorWorksHandler from "./web/author/works";
import registerHandler from "./web/register";
import authorHandler from "./web/author";
import loginHandler from "./web/login";
import rootHandler from "./web/root";
import Env from "@/interfaces/utils/env";

export default ((app: Hono<Env>) => {
    // Webルーティング
    app.get('/', rootHandler);

    app.get('/login', loginHandler);
    app.get('/register', registerHandler);

    app.get('/works/:workId', );
    app.get('/works/:workId/episodes/:episodeId',);

    app.get('/users/:userId',);
    app.get('/users/:userId/about',);
    app.get('/users/:userId/works',);
    app.get('/users/:userId/blogs',);
    app.get('/users/:userId/blogs/:blogId',);
    app.get('/users/:userId/following-users',);
    app.get('/users/:userId/following-works',);

    app.get('/author', authorHandler);

    app.get('/author/works', authorWorksHandler);
    app.get('/author/works/new', createWorkHandler);
    app.get('/author/works/:workId',);
    app.get('/author/works/:workId/episodes/:episodeId',);

    app.get('/author/blogs',);
    app.get('/author/blogs/new',);
    app.get('/author/blogs/:blogId',);

    app.get('/author/following-users',);
    app.get('/author/following-works',);

    app.get('/author/messages', authorMessagesHandler);
    app.get('/author/messages/new', authorMessagesCreateHandler);
    app.get('/author/messages/:roomId', messageRoomHandler);
    app.get('/author/messages/:roomId/setting', messageRoomSettingHandler);

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