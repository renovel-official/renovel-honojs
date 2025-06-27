const sendButton = document.querySelector('#send');
const messageBox = document.querySelector('#message');
const messageLog = document.querySelector('#message-log');
const roomId = window.location.pathname.replace('/author/messages/', '');
let lastDate = Math.floor(Date.now() / 1000); 

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
}

function formatJST(unixSeconds) {
    const date = new Date(unixSeconds * 1000);
    return date.toLocaleString();
}

sendButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const content = messageBox.value;
    console.log(content);

    if (!(content && content.length >= 1)) {
        alert('メッセージは一文字以上必要です');
        return;
    }

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

        const { message } = result.data;

        lastDate = parseInt(message.created_at);

        addMessageLog('👤', message.author_id, message.text, formatJST(lastDate));
    } catch (e) {
        console.error(e);
        alert('メッセージの送信に失敗しました');
    }

    messageBox.value = "";
});

setInterval(async () => {
    const response = await fetch(`/api/v4/messages/${roomId}?last_date=${lastDate}`, {
        method: 'GET',
    });
    const data = await response.json();

    console.log(data);

    if (!data.success) {
        throw new Error(data.message);
    }

    const { messages } = data.data;

    messages.forEach((message) => {
        lastDate = parseInt(message.created_at) + 1;
        addMessageLog('👤', message.author_id, message.text, formatJST(lastDate));

    });
}, 1000);