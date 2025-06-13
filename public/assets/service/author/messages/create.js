const createMessageButton = document.querySelector('#create-message-button');
const userAddForm = document.querySelector('#user-add-form');
const userIdBox = document.querySelector('#user-id');
const userIdList = document.querySelector('#user-list');
const userList = [];

/**
 * 
 * @param { String } userName 
 */

function addUserList(userName) {
    const element = document.createElement('div');
    element.classList.add('flex', 'items-center', 'justify-between', 'p-2', 'border-b');

    const userNameElement = document.createElement('div');
    userNameElement.classList.add('text-sm', 'text-gray-500');
    userNameElement.textContent = userName;

    const removeButton = document.createElement('button');
    removeButton.classList.add('text-red-500', 'text-sm');
    removeButton.textContent = '削除';
    removeButton.addEventListener('click', () => {
        userList.splice(userList.indexOf(userName), 1);
        userIdList.removeChild(element);
    });

    element.appendChild(userNameElement);
    element.appendChild(removeButton);

    userIdList.appendChild(element);
}

userAddForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userId = userIdBox.value;

    if (userList.includes(userId)) {
        alert('すでに追加されています');
        return;
    }

    if (userId === '') {
        return;
    }

    try {
        const response = await fetch(`/api/v2/authors/${userId}`);
        const data = await response.json();
    
        if (!data.success) {
            alert(data.message);
    
            return;
        }
    
        const { user } = data.data;
        addUserList(user.name);
        userList.push(userId);
    } catch (error) {
        console.error(error);
        alert('ユーザーの取得に失敗しました');
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
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userList }),
        });

        const data = await response.json();

        if (!data.success) {
            alert(data.message);
            return;
        }
        
        window.location.href = `/author/messages/${data.data.message.id}`;
    } catch (error) {
        console.error(error);
        alert('メッセージの作成に失敗しました');
    }
});