const titleEle = document.querySelector('#title');
const phraseEle = document.querySelector('#phrase');
const genreEle = document.querySelector('#genre');
const tagsEle = document.querySelector('#tags');
const descriptionEle = document.querySelector('#description');
const typeEle = document.querySelector('#type');
const contentAreaEle = document.querySelector('#text-section');

typeEle.addEventListener('change', (e) => {
    const type = e.target.value;
    if (type === 'short') {
        contentAreaEle.classList.remove('hidden');
    } else {
        contentAreaEle.classList.add('hidden');
    }
});