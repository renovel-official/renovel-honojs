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

        channle.subscribe((payload) => {
            console.log("Type: ", payload.name);
            console.log("data: ", payload.data);
        });


        channle.subscribe('message', async (payload) => {
            const { data } = payload;

            const createdAt = formatJST(payload.createdAt);
            const from = data.from;

            addMessageLog(messageLog, from === slug ? '👤' : '👥', data.from, data.content, (createdAt));

            if (from !== slug) {
                audio.play();
            }

            scroll();
        });

        channle.subscribe('meeting-join', async (payload) => {
            const { data } = payload;

            // 1. 自分がmeeting-joinを送った本人か？
            const isMineRequest = data.id === userId && data.timestamp === tryConnectedTimestamp;

            if (isMineRequest) {
                // 5秒待機
                await new Promise(resolve => setTimeout(resolve, 5000));
                if (connectedVC) {
                    addMessageLog(messageLog, '⚠️', 'system', '接続完了しました');
                } else {
                    // まだ誰もホストでなければ自分がホストになる
                    isHost = true;
                    connectedVC = true;
                    addMessageLog(messageLog, '⚠️', 'system', 'ホストとして通話ルームを作成します');
                    // Offer作成
                    const offer = await webRTC.createOffer();
                    await channle.publish('webrtc-offer', {
                        from: userId,
                        to: data.id, // 追加: 誰宛か明示
                        offer,
                        timestamp: getUnixTimestamp()
                    });
                }
            } else {
                // 2. 他人のmeeting-joinを受け取った場合
                if (isHost && connectedVC) {
                    // 自分がホストなら、相手にOfferを送る
                    if (data.to === userId || !data.to) { // toが自分宛、または未指定なら
                        const offer = await webRTC.createOffer();
                        await channle.publish('webrtc-offer', {
                            from: userId,
                            to: data.id, // 参加者のID
                            offer,
                            timestamp: getUnixTimestamp()
                        });
                    }
                } else {
                    // 自分がクライアントの場合
                    if (data.to === userId) {
                        connectedVC = true;
                        addMessageLog(messageLog, '⚠️', 'system', 'ホストに接続要求を送信します');
                        // Offer受信を待つ
                    }
                }
            }
        })

        // WebRTCシグナリング
        channle.subscribe('webrtc-offer', async (payload) => {
            // toが自分宛でなければ無視
            if (payload.data.to !== userId) return;
            if (payload.data.from === userId) return; // 自分のは無視

            // クライアント側: Offerを受け取ったらAnswerを返す
            await webRTC.setRemoteDescription(payload.data.offer);
            const answer = await webRTC.createAnswer();
            await channle.publish('webrtc-answer', {
                from: userId,
                to: payload.data.from, // ホスト宛
                answer,
                timestamp: getUnixTimestamp()
            });
        });

        channle.subscribe('webrtc-answer', async (payload) => {
            // toが自分宛でなければ無視
            if (payload.data.to !== userId) return;
            if (payload.data.from === userId) return;

            // ホスト側: Answerを受け取ったらセット
            await webRTC.setRemoteDescription(payload.data.answer);
        });

        // ICE candidateのやりとり
        webRTC.onIceCandidate = async (candidate) => {
            await channle.publish('webrtc-candidate', {
                from: userId,
                candidate,
                timestamp: getUnixTimestamp()
            });
        };

        channle.subscribe('webrtc-candidate', async (payload) => {
            if (payload.data.from === userId) return;
            await webRTC.addIceCandidate(payload.data.candidate);
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