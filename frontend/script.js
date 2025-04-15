
/* Helpers */
export const $ = (id) => document.getElementById(id);
/**
 * Private post element
 * @param {String} text
 * @param {String} user
 * @param {string} time
 * @param {Boolean} newPost
 * @returns
 */
const postElem = (text, user,  time, newPost) => {
    const post = document.createElement('div');
    post.classList.add('post');
    
    post.innerHTML = `
    <p class="post__user">${newPost ? 'NY: ' : ''} + ${user}</p>
    <p class="post__text">${text}</p>
    <p class="post__time">${time}</p>`
    
    return post;    
}

/**
 * Append posts to the chatbox
 * @param {Object} msg
 */
export const fetchedPosts = (msg) => {

    let chatbox = document.getElementById('chatbox');
    
    const timestamp = new Date().getTime();
    
    let formattedTime;

    const hours = timestamp.getHours().toString();
    const minutes = timestamp.getMinutes().toString().padStart(2, '0');
    formattedTime = `${hours}:${minutes}`;

    let post = postElem(msg.body, msg.displayName, formattedTime, msg.new);
    
    chatbox.append(post);
    chatbox.parentElement.scrollTo(0, chatbox.parentElement.scrollHeight);    
}

/**
 * Application entrypoint.
 * @param {String} host Host name
 * @returns
 */
export const init = (host) => {
    let clientSession = {
        displayName: sessionStorage.getItem('displayName'),
        socket: new WebSocket(`ws://${host}`),
    };

    /* Get message history from server */
    fetch(window.location + 'api/get_message_history')
        .then((response) => response.json())
        .then((data) => {clientSession['msgHistory'] = data;
            data.forEach((msg) => {
                fetchedPosts(msg);
            });
        });

    $('currentUser').innerText = 'User: ' + clientSession.displayName;

    return clientSession;
};

(() => {
    // Init application
    let client = init(window.location.host);
    
    /*client.socket.addEventListener('connect', () => {
        client.socket.send(
            JSON.stringify({
                displayName: client.displayName,
                body: 'Hello, server!',
            }),
        );

        client.socket.send(client);
    });*/

    client.socket.addEventListener('message', (e) => {
        if (e.data === ';clear') $('chatbox').innerHTML = '';
        else fetchedPosts(JSON.parse(e.data));
    });

    /*msgForm.addEventListener('submit', (e) => {
        e.preventDefault();
        Util.sendMsg(client, 'text');
    });*/

    client.socket.addEventListener('error', () => {
        location.reload();
    });


})();