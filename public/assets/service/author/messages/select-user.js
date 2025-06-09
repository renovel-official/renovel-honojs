const userAddForm = document.querySelector('#user-add-form');
const userIdBox = document.querySelector('#user-id');
const userIdList = userIdBox.querySelector('#user-list');

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

    
});