const createMessageButton = document.querySelector('#create-message-button');
const searchUserButton = document.querySelector('#search-user-button');
const messageTitleBox = document.querySelector('#message-title');
const userIdBox = document.querySelector('#user-id');
const userIdList = document.querySelector('#user-list');
const userList = [];

/**
 * ユーザーリストにユーザーを追加する
 * @param {string} userName - ユーザー名
 * @param {string} userId - ユーザーID
 */
function addUserList(userName, userId) {
    if (!userName || !userId) {
        throw new Error('ユーザー名とユーザーIDは必須です');
    }

    const element = document.createElement('div');
    element.classList.add('flex', 'items-center', 'justify-between', 'p-2', 'border-b');
    element.dataset.userId = userId;

    const userNameElement = document.createElement('div');
    userNameElement.classList.add('text-sm', 'text-gray-500');
    userNameElement.textContent = userName;

    const removeButton = document.createElement('button');
    removeButton.classList.add('text-red-500', 'text-sm', 'hover:text-red-700', 'transition-colors');
    removeButton.textContent = '削除';
    removeButton.addEventListener('click', () => removeUser(userId, element));

    element.appendChild(userNameElement);
    element.appendChild(removeButton);

    userIdList.appendChild(element);
}

/**
 * ユーザーをリストから削除する
 * @param {string} userId - 削除するユーザーID
 * @param {HTMLElement} element - 削除する要素
 */
function removeUser(userId, element) {
    const index = userList.indexOf(userId);
    if (index > -1) {
        userList.splice(index, 1);
        userIdList.removeChild(element);
    }
}

/**
 * ユーザーIDのバリデーション
 * @param {string} userId - 検証するユーザーID
 * @returns {boolean} バリデーション結果
 */
function validateUserId(userId) {
    if (!userId || userId.trim() === '') {
        alert('ユーザーIDを入力してください');
        return false;
    }
    if (userList.includes(userId)) {
        alert('すでに追加されています');
        return false;
    }
    return true;
}

/**
 * APIリクエストのエラーハンドリング
 * @param {Error} error - エラーオブジェクト
 * @param {string} message - エラーメッセージ
 */
function handleError(error, message) {
    console.error(error);
    alert(message);
}

/**
 * ユーザーを検索する
 * @param {Event} e - イベントオブジェクト
 */
searchUserButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const userId = userIdBox.value.trim();
    userIdBox.value = '';

    if (!validateUserId(userId)) {
        return;
    }

    try {
        const response = await fetch(`/api/v2/authors/${encodeURIComponent(userId)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
    
        if (!data.success) {
            alert(data.message);
            return;
        }
    
        const { user } = data.data;
        addUserList(user.name, userId);
        userList.push(userId);
        userIdBox.value = '';
    } catch (error) {
        handleError(error, 'ユーザーの取得に失敗しました');
    }
});

createMessageButton.addEventListener('click', async (e) => {
    e.preventDefault();

    if (userList.length === 0) {
        alert('ユーザーを追加してください');
        return;
    }

    try {
        const response = await fetch('/api/v4/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ users: userList, title: messageTitleBox.value ?? "ルーム名未設定" }),
        });

        const data = await response.json();
        console.log(data);

        if (!data.success) {
            alert(data.message);
            return;
        }
        
        window.location.href = `/author/messages/${data.data.room.slug}`;
    } catch (error) {
        handleError(error, 'メッセージの作成に失敗しました');
    }
});