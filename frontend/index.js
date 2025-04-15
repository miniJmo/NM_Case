const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

const port = process.argv[2];

app.use(express.json());
app.use('/', express.static(__dirname + '/public')); // Serves client-side files.
let wss = expressWs.getWss('/');

// Semi persistent message history for new connections
const messageHistory = [
    {
        user: 'Cool Server😎',
        time: new Date().getTime(),
        text: '🍔🍔',
    },
];

// Primary communications socket.
app.ws('/', (ws, req) => {
    ws.on('message', (message) => {
        console.log(message);

        const msg = JSON.parse(message);
        wss.clients.forEach((client) => {
            if (msg.body === ';clear') {
                client.send(';clear');
                messageHistory.splice(1, messageHistory.length);
                client.send(JSON.stringify(messageHistory[0]));
            } else {
                client.send(message);
            }
        });

        if (msg !== ';clear') messageHistory.push(JSON.parse(message));
    });
});

// Route: Message history.
app.get('/api/get_message_history/', (req, res) => {
    res.send(messageHistory);
});

app.listen(port, () => {
    console.log(`server listening on ${port}`);
});