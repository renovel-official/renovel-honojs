const sendButton = document.querySelector('#send');
const messageBox = document.querySelector('#message');
const messageLog = document.querySelector('#message-log');
const roomId = window.location.pathname.replace('/author/messages/', '');
const audio = new Audio("/assets/audio/alert.mp3");

/**
 * メッセージ受信時に実行する関数
 * @param { String } icon 
 * @param { String } authorId 
 * @param { String } content 
 * @param { String } createdAt 
 */
function addMessageLog(icon, authorId, content, createdAt) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('flex', 'items-start', 'space-x-3', 'p-4', 'border-b', 'border-gray-200');

    const iconElement = document.createElement('div');
    iconElement.classList.add('text-2xl');
    iconElement.innerText = icon;

    const mainContentElement = document.createElement('div');

    const metaElement = document.createElement('div');
    metaElement.classList.add('flex', 'items-baseline', 'space-x-2');

    const authorIdElement = document.createElement('span');
    authorIdElement.classList.add('font-semibold');
    authorIdElement.innerText = authorId;

    const dateElement = document.createElement('span');
    dateElement.classList.add('text-xs', 'text-gray-500');
    dateElement.innerText = createdAt;

    metaElement.appendChild(authorIdElement);
    metaElement.appendChild(dateElement);
    mainContentElement.appendChild(metaElement);

    const contentElement = document.createElement('div');
    contentElement.classList.add('mt-1', 'text-gray-700');
    contentElement.innerText = content;

    mainContentElement.appendChild(contentElement);

    messageElement.appendChild(iconElement);
    messageElement.appendChild(mainContentElement);

    messageLog.appendChild(messageElement);

    scroll();
}

function formatJST(ms) {
    const date = new Date(ms);
    return date.toLocaleString();
}

/**
 * @param { string } content 
 * @returns { Record<string, string> } メッセージオブジェクトを返します
 */

async function sendMessageLog(content) {
    try {
        const response = await fetch(`/api/v4/messages/${roomId}`, {
            method: 'POST',
            body: JSON.stringify({
                content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message);
        }

        return result.data;
    } catch (e) {
        console.error(e);
        alert('メッセージの送信に失敗しました');

        return null;
    }
}
/**
 * @returns { string | null } - 自身のslugを返します
 */
async function connect() {
    try {
        const response = await fetch('/api/v1/session');
        const data = await response.json();
    
        if (data.success) {
            return data.data.user.slug;
        } else {
            return null;
        }
    } catch {
        return null;
    }
    
}


function scroll() {
    messageLog.scrollTo({
        top: messageLog.scrollHeight,
        behavior: 'smooth'
    });
}

// 初期関数
(() => scroll())();

(async () => {
    const slug = await connect();

    if (slug === null) {
        alert('接続に失敗しました');
        window.location.href = '/author/messages';
        return;
    }

    const { location } = window;
    const absoluteUrl = `//${location.host}`;
    /**
     * @type {import('ably').Realtime}
     */
    const ably = new Ably.Realtime({
        authUrl: `${absoluteUrl}/api/v4/messages/${roomId}/token`
    });

    ably.connection.once('connected', () => {
        const channle = ably.channels.get(`chat-${roomId}`);
        
        channle.subscribe(msg => {
            const { data } = msg;
            const createdAt = formatJST(msg.createdAt);
            const from = data.from;

            addMessageLog(from === slug ? '👤' : '👥', data.from, data.content, (createdAt));

            if (from !== slug) {
                audio.play();
            }

            messageLog.scrollTo({
                top: messageLog.scrollHeight,
                behavior: 'smooth'
            });
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
    });

    ably.connection.on((stateChange) => {
        console.log('Ably connection state:', stateChange);
    });
})();

