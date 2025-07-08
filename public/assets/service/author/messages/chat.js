// 定数宣言
const sendButton = document.querySelector('#send');
const messageBox = document.querySelector('#message');
const messageLog = document.querySelector('#message-log');
const startButton = document.querySelector('#start-meeting');
const localAudio = document.querySelector('#localAudio');
const remoteAudio = document.querySelector('#remoteAudio');

const roomId = window.location.pathname.replace('/author/messages/', '');
const audio = new Audio("/assets/audio/alert.mp3");
const absoluteUrl = `//${window.location.host}`;
const ABLY_AUTH_URL = `${absoluteUrl}/api/v5/ably/${roomId}/auth`;
const userId = uuid();
const SLEEP_TIME = 3 * 1000; // 3秒

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
/**
 * @type { undefined | RTCPeerConnection }
 */
let peer;
/**
 * @type { undefined | MediaStream }
 */
let localStream;

/**
 * 
 * @param { import('ably').RealtimeChannel } channel 
 */
async function meetingLoop(channel) {
    startButton.innerText = "接続中...";
    startButton.type = "close";
    peer = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });

    localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    localAudio.srcObject = localStream;

    localStream.getTracks().forEach(track => peer.addTrack(track, localStream));

    peer.onicecandidate = ({ candidate }) => {
        if (candidate) {
            channel.publish('meeting-candidate', { id: userId, candidate });
        }
    };

    peer.ontrack = ({ streams }) => {
        remoteAudio.srcObject = streams[0];
    };

}


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
                await new Promise(resolve => setTimeout(resolve, SLEEP_TIME));
                const payload = {
                    from: 'system',
                    content: `${slug}が通話を始めました`
                }
                if (connectedVC) {
                    addMessageLog(messageLog, '⚠️', 'system', '接続完了しました');
                    payload.content = `${slug}が通話に参加しました`;
                } else {
                    // まだ誰もホストでなければ自分がホストになる
                    addMessageLog(messageLog, '⚠️', 'system', 'ホストとして通話ルームを作成します');
                    isHost = true;
                    connectedVC = true;
                }

                await channle.publish('message', payload);
            } else {
                // 2. 他人のmeeting-joinを受け取った場合
                if (isHost && connectedVC) {
                    addMessageLog(messageLog, '⚠️', 'system', `${data.from}が接続しようとしています...`);
                    const offer = new RTCSessionDescription(data.offer);
                    await peer.setRemoteDescription(offer);

                    const answer = await peer.createAnswer();
                    await peer.setLocalDescription(answer);

                    const payload = {
                        from: slug,
                        id: userId,
                        to: data.id,

                        answer
                    }

                    await channle.publish('meeting-answer', payload);
                }
            }
        });

        channle.subscribe('meeting-answer', async (payload) => {
            const { data } = payload;

            if (data.to === userId) {
                addMessageLog(messageLog, '⚠️', 'system', `${data.from}が接続を許可しました...`);
                const { answer } = data;
                await peer.setRemoteDescription(new RTCSessionDescription(answer));

                connectedVC = true;
            }
        });

        channle.subscribe('meeting-candidate', async (payload) => {
            const { id, candidate } = payload.data;

            if (id !== userId) {
                await peer.addIceCandidate(new RTCIceCandidate(candidate));
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
            const { type } = startButton;

            if (type === "start") {
                tryConnectedTimestamp = getUnixTimestamp();
                await meetingLoop(channle);
                const offer = await peer.createOffer();
                peer.setLocalDescription(offer);
    
                const payload = {
                    // message
                    from: slug,
    
                    id: userId,
                    offer,
                    timestamp: tryConnectedTimestamp
                }
    
                await channle.publish('meeting-join', payload);
            } else if (type === "close") {
                connectedVC = false;
                peer.close();

                await channle.publish('message', { from: "system", content: `${slug}が退出しました` });
            }
        });
    });

    ably.connection.on((stateChange) => {
        console.log('Ably connection state:', stateChange);
    });
})();