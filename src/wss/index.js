const WebSocket = require('ws');
const fetch = require('node-fetch');
const http = require('http');
const url = require('url');

const server = http.createServer();
const wss = new WebSocket.Server({ 
    server,
    path: '/ws'  // ベースパス
});

const apiHost = 'https://renovel.herentongkegu087.workers.dev/api';

wss.on('connection', async (ws, req) => {
    // URLからroomIdを取得
    const parsedUrl = url.parse(req.url, true);
    const pathParts = parsedUrl.pathname.split('/');
    const roomId = pathParts[2]; // /ws/:roomId の roomId 部分

    if (!roomId) {
        return ws.close(1008, 'Room ID is required');
    }

    // roomIdをWebSocketインスタンスに保存
    ws.roomId = roomId;

    const token = req.headers['authorization'].replace('Bearer ', '');
    const response = await fetch(`${apiHost}/v1/session?token=${token}`, {
        method: 'GET'
    });
    const data = await response.json();

    if (!data.success) {
        return ws.close();
    }

    // 接続成功メッセージにroomIdを含める
    return ws.send(JSON.stringify({
        success: true,
        message: 'Session is valid',
        data: {
            user: data.data.user,
            roomId: roomId
        }
    }));
});

wss.on('message', (message) => {
    console.log(`Message from room ${message.roomId}:`, message);
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});