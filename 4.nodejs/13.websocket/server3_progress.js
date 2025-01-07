const express = require('express');
const path = require('path');
const { WebSocketServer } = require('ws');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'progress.html'));
});

const server = app.listen(port, () => {
    console.log('서버레디');
});

const wss = new WebSocketServer({server});

wss.on('connection', (ws) => {
    console.log('클라이언트 웹소켓으로 접속');

    ws.on('message', (message) => {
        console.log(message, message.toString());
        if (message.toString() === 'start') {
            let progress = 0;

            const interval = setInterval(() => {
                progress += 10;
                ws.send(JSON.stringify({progress}));

                if (progress >= 100) {
                    clearInterval(interval);
                    console.log('작업완료');
                }
            }, 500); // 500ms 마다...

        }
    })
});
