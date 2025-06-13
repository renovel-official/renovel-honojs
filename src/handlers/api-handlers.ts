import { Hono } from "hono";
import { loginHandler } from "./api/v1/login";
import { logoutHandler } from "./api/v1/logout";
import { authorHandler } from "./api/v2/[slug]/author";
import { sessionHandler } from "./api/v1/session";
import { authorsHandler } from "./api/v2/authors";
import { registerHandler } from "./api/v1/register";
import placeholderHandler from "./api/utils/placeholder";
import Env from "@/interfaces/utils/env";

export default ((app: Hono<Env>) => {
    // アカウント関連api
    app.post('/api/v1/login', loginHandler);
    app.post('/api/v1/register', registerHandler);
    app.get('/api/v1/logout', logoutHandler);
    app.get('/api/v1/session', sessionHandler);
    

    // 作者関連api
    app.get('/api/v2/authors', authorsHandler);
    app.get('/api/v2/authors/:userId', authorHandler);
    
    // 作品関連api
    app.get('/api/v3/works', );
    app.post('/api/v3/works', );

    app.get('/api/v3/works/:workId', );
    app.put('/api/v3/works/:workId', );

    app.get('/api/v3/works/:workId/authors', );
    app.post('/api/v3/works/:workId/authors', );
    app.delete('/api/v3/works/:workId/authors', );

    app.get('/api/v3/works/:workId/good', );

    app.get('/api/v3/works/:workId/episodes/:episodeId', );
    app.get('/api/v3/works/:workId/episodes/:episodeId/good', );
    app.get('/api/v3/works/:workId/episodes/:episodeId/comments', );
    app.get('/api/v3/works/:workId/episodes/:episodeId/comments/:commentId', );

    app.post('/api/v4/messages', );
    app.get('/api/v4/messages/:roomId', );
    app.post('/api/v4/messages/:roomId', );
    
    app.get('/api/v5/search', );
    app.get('/api/v5/ranking', );
    app.get('/api/v5/blog', );
    
    app.get('/api/utils/placeholder/:workId', placeholderHandler);
    
    // 管理APIルーティング
    app.get('/api/admin/login', );
    app.get('/api/admin/logout', );
    app.get('/api/admin/works', );
    app.get('/api/admin/works/:workId', );
    app.get('/api/admin/works/:workId/episodes/:episodeId', );
    app.get('/api/admin/blogs', );
});