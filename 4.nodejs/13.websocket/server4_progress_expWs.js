const express = require('express');
const expressWs = require('express-ws');
const path = require('path');

const app = express();
expressWs(app);

const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'progress2.html'));
});

app.ws('/progress', (ws, req) => {
    console.log('클라이언트 웹소켓으로 접속');
    let interval;

    ws.on('message', (message) => {
        console.log(message, message.toString());

        if (message.toString() === 'start') {
            let progress = 0;

            interval = setInterval(() => {
                progress += 10;
                ws.send(JSON.stringify({progress}));

                if (progress >= 100) {
                    clearInterval(interval);
                    console.log('작업완료');
                }
            }, 500); // 500ms 마다...
            console.log(`시작메시지가왔네?? ${interval}`);
        } else if (message.toString() === 'stop') {
            console.log(`스탑메시지가왔네?? ${interval}`);
            clearInterval(interval);
        }
    })
});

const server = app.listen(port, () => {
    console.log('서버레디');
});

