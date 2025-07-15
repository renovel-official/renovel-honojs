// chat.js（複数人が通話・発言できる完全版）
const sendButton = document.querySelector('#send');
const messageBox = document.querySelector('#message');
const messageLog = document.querySelector('#message-log');
const startButton = document.querySelector('#start-meeting');
const meetingLabel = document.querySelector('#meeting-label');
const localAudio = document.querySelector('#localAudio');
const remoteAudio = document.querySelector('#remoteAudio');

const roomId = window.location.pathname.replace('/author/messages/', '');
const audio = new Audio("/assets/audio/alert.mp3");
const absoluteUrl = `//${window.location.host}`;
const ABLY_AUTH_URL = `${absoluteUrl}/api/v5/ably/${roomId}/auth`;
const userId = uuid();
const peerMap = new Map();
let localStream;
let connectedVC = false;

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

    const ably = new Ably.Realtime({ authUrl: ABLY_AUTH_URL });

    ably.connection.once('connected', () => {
        const channel = ably.channels.get(`chat-${roomId}`);

        channel.subscribe('message', async ({ data, createdAt }) => {
            const from = data.from;
            const timestamp = formatJST(createdAt);
            addMessageLog(messageLog, from === slug ? '👤' : '👥', from, data.content, timestamp);
            if (from !== slug) audio.play();
            scroll();
        });

        channel.subscribe('meeting-join', async ({ data }) => {
            if (data.id === userId) return;

            const peer = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });

            peer.ontrack = ({ streams }) => {
                const remote = document.createElement('audio');
                remote.srcObject = streams[0];
                remote.autoplay = true;
                remote.controls = true;
                remoteAudio.parentElement.appendChild(remote);
            };

            localStream.getTracks().forEach(track => peer.addTrack(track, localStream));

            peer.onicecandidate = ({ candidate }) => {
                if (candidate) {
                    channel.publish('meeting-candidate', { from: userId, to: data.id, candidate });
                }
            };

            await peer.setRemoteDescription(new RTCSessionDescription(data.offer));
            const answer = await peer.createAnswer();
            await peer.setLocalDescription(answer);

            peerMap.set(data.id, peer);

            channel.publish('meeting-answer', { from: userId, to: data.id, answer });
        });

        channel.subscribe('meeting-answer', async ({ data }) => {
            if (data.to !== userId) return;
            const peer = peerMap.get(data.from);
            if (peer) await peer.setRemoteDescription(new RTCSessionDescription(data.answer));
        });

        channel.subscribe('meeting-candidate', async ({ data }) => {
            if (data.to !== userId) return;
            const peer = peerMap.get(data.from);
            if (peer) await peer.addIceCandidate(new RTCIceCandidate(data.candidate));
        });

        sendButton.addEventListener('click', async e => {
            e.preventDefault();
            const content = messageBox.value;
            if (!content || content.length < 1) return alert('メッセージは一文字以上必要です');
            const result = await sendMessageLog(content);
            channel.publish('message', { from: result.message.author_id, content });
            messageBox.value = "";
        });

        startButton.addEventListener('click', async e => {
            e.preventDefault();
            if (startButton.dataset.type === 'start') {
                meetingLabel.innerText = "接続中...";

                localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                localAudio.srcObject = localStream;

                startButton.dataset.type = 'close';
                meetingLabel.innerText = "通話中";
                connectedVC = true;

                // 全体にofferを配信する
                const peer = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });

                peer.ontrack = ({ streams }) => {
                    const remote = document.createElement('audio');
                    remote.srcObject = streams[0];
                    remote.autoplay = true;
                    remote.controls = true;
                    remoteAudio.parentElement.appendChild(remote);
                };

                localStream.getTracks().forEach(track => peer.addTrack(track, localStream));

                peer.onicecandidate = ({ candidate }) => {
                    if (candidate) {
                        channel.publish('meeting-candidate', { from: userId, to: null, candidate });
                    }
                };

                const offer = await peer.createOffer();
                await peer.setLocalDescription(offer);

                peerMap.set('broadcast', peer);

                channel.publish('meeting-join', { from: slug, id: userId, offer });
            } else {
                // 通話終了処理（接続先ごとにclose）
                for (const [id, peer] of peerMap.entries()) {
                    peer.close();
                    peerMap.delete(id);
                }
                startButton.dataset.type = 'start';
                meetingLabel.innerText = "通話";
                connectedVC = false;
            }
        });
    });
})();
