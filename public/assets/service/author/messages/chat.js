// 定数宣言
const sendButton = document.querySelector('#send');
const messageBox = document.querySelector('#message');
const messageLog = document.querySelector('#message-log');
const startButton = document.querySelector('#start-meeting');

const roomId = window.location.pathname.replace('/author/messages/', '');
const audio = new Audio("/assets/audio/alert.mp3");
const absoluteUrl = `//${window.location.host}`;
const ABLY_AUTH_URL = `${absoluteUrl}/api/v5/ably/${roomId}/auth`;
const userId = uuid();
const webRTC = new WebRTC();

// 変数
/**
 * @type { boolean }
 */
let connectedVC = false;
/**
 * @type { boolean }
 */
let isHost = false;
/**
 * @type { number }
 */
let tryConnectedTimestamp = 0;

// 初期関数
(() => {
    console.log('Your user id: ', userId);
    scroll();
})();

(async () => {
    const slug = await connect();

    if (slug === null) {
        alert('接続に失敗しました');
        window.location.href = '/author/messages';
        return;
    }
    
    /**
     * @type {import('ably').Realtime}
     */
    const ably = new Ably.Realtime({
        authUrl: ABLY_AUTH_URL
    });

    ably.connection.once('connected', () => {
        const channle = ably.channels.get(`chat-${roomId}`);
        
        
        channle.subscribe(async (payload) => {
            const type = payload.name;
            const data = payload.data;
            console.log('name: ', type);
            console.log('data: ', data);

            switch (type) {
                case 'message':
                    const createdAt = formatJST(payload.createdAt);
                    const from = data.from;
        
                    addMessageLog(messageLog, from === slug ? '👤' : '👥', data.from, data.content, (createdAt));
        
                    if (from !== slug) {
                        audio.play();
                    }
        
                    scroll();
                    break;

                case 'meeting-join':
                    console.log('request id: ', data.id);
                    const isMineRequest = data.id === userId && data.timestamp === tryConnectedTimestamp;
                    console.log('Mine Request: ', isMineRequest);
                    
                    // 自分が送信したmeeting-joinに対する返信かチェック
                    if (isMineRequest) {
                        // 5秒待機
                        await new Promise(resolve => setTimeout(resolve, 5000));
                        if (connectedVC) {
                            addMessageLog(messageLog, '⚠️', 'system', '接続完了しました');
                        } else {
                            // TODO: 通話ルームを作成する処理を以下に
                            
                        }
                    } else {
                        if (connectedVC) {
                            if (isHost) {
                                const payload = {
                                    id: userId,
                                    to: data.id,
                                    sdp: "",
                                    timestamp: getUnixTimestamp()
                                }

                                await channle.publish('meeting-join', payload);
                            }
                        } else {
                            const { to } = data;

                            if (to === userId) { // 自分宛か確認
                                // TODO: 接続処理を以下に

                            }
                        }
                    }
                    break;

            }

            
        });


        sendButton.addEventListener('click', async (e) => {
            e.preventDefault();
            const content = messageBox.value;

            if (!(content && content.length >= 1)) {
                alert('メッセージは一文字以上必要です');
                return;
            }

            const result = await sendMessageLog(content);
            const payload = {
                from: result.message.author_id,
                content
            };

            if (!result) {
                return;
            }

            messageBox.value = "";

            channle.publish('message', payload);

            return;
        });

        startButton.addEventListener('click', async (e) => {
            e.preventDefault();
            
            tryConnectedTimestamp = getUnixTimestamp();
            const payload = {
                // message
                from: 'system',
                content: 'VC要求。接続開始...',

                id: userId,
                timestamp: tryConnectedTimestamp
            }

            await channle.publish('meeting-join', payload);
        });
    });

    ably.connection.on((stateChange) => {
        console.log('Ably connection state:', stateChange);
    });
})();