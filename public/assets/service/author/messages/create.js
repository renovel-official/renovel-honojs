const userAddForm = document.querySelector('#user-add-form');
const userIdBox = document.querySelector('#user-id');
const userIdList = userIdBox.querySelector('#user-list');

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

    element.appendChild(userNameElement);
}

userAddForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userId = userIdBox.value;

    if (userId === '') {
        return;
    }

    const response = await fetch(`/api/v2/authors/${userId}`);
    const data = await response.json();

    if (!data.success) {
        alert(data.message);

        return;
    }

    const { user } = data.data;
    addUserList(user.name);
});