/**
 * メッセージ受信時に実行する関数
 * @param { Element } ele
 * @param { String } icon 
 * @param { String } authorId 
 * @param { String } content 
 * @param { String } createdAt 
 */
function addMessageLog(ele, icon, authorId, content, createdAt) {
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

    ele.appendChild(messageElement);

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
 * @returns { Promise<string | null> } - 自身のslugを返します
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

/**
 * @returns { string }
 */
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * 
 * @returns { number }
 */
function getUnixTimestamp() {
    return Math.floor(Date.now() / 1000);
}

/**
 * @param { string } slug
 * @return { Promise< import('@/interfaces/user').User | null > }
 */

async function getUser(slug) {
    try {
        const response = await fetch(`/api/v1/users/${encodeURIComponent(slug)}`);
        const data = await response.json();

        if (data.success) {
            return data.data;
        } else {
            throw new Error(data.message);
        }
    } catch (e) {
        console.error(e);
        alert('ユーザー情報の取得に失敗しました');
        return null;
    }
}