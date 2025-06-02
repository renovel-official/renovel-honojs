const termAgreeCheckbox = document.querySelector('#agree');
const submitButton = document.querySelector('#register-button');

console.log(termAgreeCheckbox, submitButton);

addEventListener('DOMContentLoaded', () => {
    submitButton.classList.add('bg-gray-500');
    submitButton.disabled = true;
})

termAgreeCheckbox.addEventListener('change', () => {
    if (termAgreeCheckbox.checked) {
        submitButton.classList.remove('bg-gray-500');
        submitButton.classList.add('bg-blue-500');
        submitButton.classList.add('hover:bg-blue-600');

        submitButton.disabled = false;
    } else {
        submitButton.classList.add('bg-gray-500');
        submitButton.classList.remove('bg-blue-500');
        submitButton.classList.remove('hover:bg-blue-600');

        submitButton.disabled = true;
    }
});