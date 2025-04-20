/**
 * Private post element
 * @param {String} content
 * @param {String} author
 * @param {number} time
 * @param {Boolean} seen
 * @returns
 */
const postElem = (author, content,  time, seen) => {
    const post = document.createElement('div');
    post.classList.add('post');

    post.innerHTML = `
    <span>
        <p class="post__new">${seen ? '': 'NY: '}</p>
        <p class="post__user">${author}</p>
    </span>
    <p class="post__text">${content}</p>
    <p class="post__time">${time}</p>`

    return post;
}

document.addEventListener("DOMContentLoaded", () => {
    const chatbox = document.getElementById('chatbox');
    const chat__form = document.getElementById('chat__form');

    async function fetchPosts() {
    try{
        const response = await fetch('/posts').then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
        });

        const posts = await response.json();
        console.log("Fetched posts:", posts);

        for (const _post of posts) {
            let post = postElem(_post.author, _post.content, _post.time, _post.seen);
            chatbox.append(post);

            chatbox.parentElement.scrollTo(0, chatbox.parentElement.scrollHeight);
        }
    } catch (error) {
        console.error("Failed to load posts:", error);
    }
    }

    chat__form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const author = document.getElementById('usernameInput').value;
        const content = document.getElementById('textInput').value;
        const time = Date.now();
        const seen = false;

        await fetch('/posts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({author: author, content: content, time, seen}),
        });

        chat__form.reset();
        await fetchPosts();
    });

    fetchPosts().then(posts => {
        posts.forEach(post => {
            console.log(post.author);
        });
    }).catch(error => {
        console.error("Failed to load posts:", error);
    });
});
