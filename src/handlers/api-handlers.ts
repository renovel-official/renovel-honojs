import { Hono } from "hono";
import placeholderHandler from "./api/utils/placeholder";
import Env from "@/interfaces/utils/env";

export default ((app: Hono<Env>) => {
    app.get('/api/v1/login', );
    app.get('/api/v1/register', );
    app.get('/api/v1/session', );
    app.get('/api/v1/logout', );
    
    app.get('/api/v2/works', );
    app.get('/api/v2/works/:workId', );
    app.get('/api/v2/works/:workId/good', )
    app.get('/api/v2/works/:workId/episodes/:episodeId', );
    app.get('/api/v2/works/:workId/episodes/:episodeId/good', );
    app.get('/api/v2/works/:workId/episodes/:episodeId/comments', );
    app.get('/api/v2/works/:workId/episodes/:episodeId/comments/:commentId', );
    
    app.get('/api/v3/search', );
    app.get('/api/v3/ranking', );
    app.get('/api/v3/blog', );
    
    app.get('/api/utils/placeholder/:workId', placeholderHandler);
    
    // 管理APIルーティング
    app.get('/api/admin/login', );
    app.get('/api/admin/logout', );
    app.get('/api/admin/works', );
    app.get('/api/admin/works/:workId', );
    app.get('/api/admin/works/:workId/episodes/:episodeId', );
    app.get('/api/admin/blogs', );
});