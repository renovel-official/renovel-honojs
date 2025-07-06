class WebRTC {
    constructor(options = {}) {
        this.peerConnection = null;
        this.localStream = null;
        this.remoteStream = null;
        this.dataChannel = null;
        this.isInitiator = options.isInitiator || false;
        this.onIceCandidate = options.onIceCandidate || null;
        this.onDataChannel = options.onDataChannel || null;
        this.onTrack = options.onTrack || null;
        this.onConnectionStateChange = options.onConnectionStateChange || null;
        this.onIceConnectionStateChange = options.onIceConnectionStateChange || null;
        
        // STUN/TURNサーバーの設定
        this.configuration = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' }
            ],
            ...options.configuration
        };
        
        this.init();
    }

    /**
     * WebRTC接続を初期化
     */
    init() {
        try {
            this.peerConnection = new RTCPeerConnection(this.configuration);
            this.setupEventListeners();
        } catch (error) {
            console.error('WebRTC初期化エラー:', error);
            throw error;
        }
    }

    /**
     * イベントリスナーを設定
     */
    setupEventListeners() {
        // ICE候補の処理
        this.peerConnection.onicecandidate = (event) => {
            if (event.candidate && this.onIceCandidate) {
                this.onIceCandidate(event.candidate);
            }
        };

        // 接続状態の変更
        this.peerConnection.onconnectionstatechange = () => {
            console.log('接続状態:', this.peerConnection.connectionState);
            if (this.onConnectionStateChange) {
                this.onConnectionStateChange(this.peerConnection.connectionState);
            }
        };

        // ICE接続状態の変更
        this.peerConnection.oniceconnectionstatechange = () => {
            console.log('ICE接続状態:', this.peerConnection.iceConnectionState);
            if (this.onIceConnectionStateChange) {
                this.onIceConnectionStateChange(this.peerConnection.iceConnectionState);
            }
        };

        // リモートストリームの受信
        this.peerConnection.ontrack = (event) => {
            this.remoteStream = event.streams[0];
            if (this.onTrack) {
                this.onTrack(this.remoteStream);
            }
        };

        // データチャンネルの受信
        this.peerConnection.ondatachannel = (event) => {
            this.dataChannel = event.channel;
            this.setupDataChannelListeners();
            if (this.onDataChannel) {
                this.onDataChannel(this.dataChannel);
            }
        };
    }

    /**
     * ローカルメディアストリームを取得
     */
    async getUserMedia(constraints = { video: true, audio: true }) {
        try {
            this.localStream = await navigator.mediaDevices.getUserMedia(constraints);
            this.localStream.getTracks().forEach(track => {
                this.peerConnection.addTrack(track, this.localStream);
            });
            return this.localStream;
        } catch (error) {
            console.error('メディア取得エラー:', error);
            throw error;
        }
    }

    /**
     * データチャンネルを作成
     */
    createDataChannel(label, options = {}) {
        try {
            this.dataChannel = this.peerConnection.createDataChannel(label, options);
            this.setupDataChannelListeners();
            return this.dataChannel;
        } catch (error) {
            console.error('データチャンネル作成エラー:', error);
            throw error;
        }
    }

    /**
     * データチャンネルのイベントリスナーを設定
     */
    setupDataChannelListeners() {
        if (!this.dataChannel) return;

        this.dataChannel.onopen = () => {
            console.log('データチャンネルが開きました');
        };

        this.dataChannel.onclose = () => {
            console.log('データチャンネルが閉じられました');
        };

        this.dataChannel.onerror = (error) => {
            console.error('データチャンネルエラー:', error);
        };

        this.dataChannel.onmessage = (event) => {
            console.log('データチャンネルメッセージ受信:', event.data);
        };
    }

    /**
     * オファーを作成
     */
    async createOffer(options = {}) {
        try {
            const offer = await this.peerConnection.createOffer(options);
            await this.peerConnection.setLocalDescription(offer);
            return offer;
        } catch (error) {
            console.error('オファー作成エラー:', error);
            throw error;
        }
    }

    /**
     * アンサーを作成
     */
    async createAnswer(options = {}) {
        try {
            const answer = await this.peerConnection.createAnswer(options);
            await this.peerConnection.setLocalDescription(answer);
            return answer;
        } catch (error) {
            console.error('アンサー作成エラー:', error);
            throw error;
        }
    }

    /**
     * リモートのSDPを設定
     */
    async setRemoteDescription(description) {
        try {
            await this.peerConnection.setRemoteDescription(description);
        } catch (error) {
            console.error('リモートSDP設定エラー:', error);
            throw error;
        }
    }

    /**
     * ICE候補を追加
     */
    async addIceCandidate(candidate) {
        try {
            await this.peerConnection.addIceCandidate(candidate);
        } catch (error) {
            console.error('ICE候補追加エラー:', error);
            throw error;
        }
    }

    /**
     * データチャンネルでメッセージを送信
     */
    sendMessage(message) {
        if (this.dataChannel && this.dataChannel.readyState === 'open') {
            this.dataChannel.send(message);
        } else {
            console.warn('データチャンネルが利用できません');
        }
    }

    /**
     * 接続を閉じる
     */
    close() {
        if (this.localStream) {
            this.localStream.getTracks().forEach(track => track.stop());
        }
        
        if (this.dataChannel) {
            this.dataChannel.close();
        }
        
        if (this.peerConnection) {
            this.peerConnection.close();
        }
    }

    /**
     * 接続状態を取得
     */
    getConnectionState() {
        return this.peerConnection ? this.peerConnection.connectionState : 'closed';
    }

    /**
     * ICE接続状態を取得
     */
    getIceConnectionState() {
        return this.peerConnection ? this.peerConnection.iceConnectionState : 'closed';
    }

    /**
     * ローカルストリームを取得
     */
    getLocalStream() {
        return this.localStream;
    }

    /**
     * リモートストリームを取得
     */
    getRemoteStream() {
        return this.remoteStream;
    }

    /**
     * データチャンネルを取得
     */
    getDataChannel() {
        return this.dataChannel;
    }
}

// グローバルに公開
if (typeof window !== 'undefined') {
    window.WebRTC = WebRTC;
}