const titleEle = document.querySelector('#title');
const phraseEle = document.querySelector('#phrase');
const genreEle = document.querySelector('#genre');
const tagsEle = document.querySelector('#tags');
const descriptionEle = document.querySelector('#description');
const typeEle = document.querySelector('#type');
const contentAreaEle = document.querySelector('#text-section');
const textEle = document.querySelector('#text');
const authorsEle = document.querySelector('#authors');
const authorEle = document.querySelector('#author-id');
const authorAddEle = document.querySelector('#author-add');
const saveButtonEle = document.querySelector('#save');
const authors = [];
const userId = connect().then(data => data || null);


typeEle.addEventListener('change', (e) => {
    const type = e.target.value;
    if (type === 'short') {
        contentAreaEle.classList.remove('hidden');
    } else {
        contentAreaEle.classList.add('hidden');
    }
    
    return;
});

authorAddEle.addEventListener('click', async (e) => {
    e.preventDefault();
    const authorId = authorEle.value.trim();

    if (authorId === '') {
        alert('ユーザーIDを入力してください');
        return;
    }

    if (authorId === userId) {
        alert('自分自身を追加することはできません');
        return;
    }

    const response = await getUser(authorId);
    console.log("Author fetched:", response);

    if (!response) {
        alert('指定されたユーザーが見つかりません');
        return;
    }

    if (authors.includes(authorId)) {
        alert('このユーザーはすでに追加されています');
        return;
    }

    const author = response.user;

    authors.push(authorId);
    const authorElement = document.createElement('div');
    authorElement.classList.add('flex', 'items-center', 'gap-2', 'bg-gray-100', 'p-2', 'rounded', 'mb-2');
    authorElement.innerText = `${author.name} (${authorId})`;
    const removeButton = document.createElement('button');
    removeButton.classList.add('text-red-500', 'hover:underline');
    removeButton.innerText = '削除';
    removeButton.addEventListener('click', () => {
        authors.splice(authors.indexOf(authorId), 1);
        authorElement.remove();
    });
    authorElement.appendChild(removeButton);
    authorsEle.appendChild(authorElement);

    authorEle.value = ''; // 入力フィールドをクリア

    return;
});

saveButtonEle.addEventListener('click', async (e) => {
    e.preventDefault();

    /**
     * @type { { [key: string]: string }: string }
     */
    const payload = {
        title: titleEle.value,
        phrase: phraseEle.value,
        genre: genreEle.value,
        tags: tagsEle.value,
        description: descriptionEle.value,
        type: typeEle.value,
        text: textEle.value
    }

    const response = await fetch('/api/v3/works', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...payload,
            authors: authors
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        alert(`作品の保存に失敗しました: ${errorData.message}`);
        return;
    }

    const data = await response.json();

    if (!data.success) {
        alert(`作品の保存に失敗しました: ${data.message}`);
        return;
    }

    window.location.href = `/author/works/${data.data.work.slug}`;
    return;
});