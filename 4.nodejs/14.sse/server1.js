const express = require('express');
const path = require('path');
const cors = require('cors');

const port = 3000;

const app = express();
app.use(cors()); // 모든 origin 다 허용

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/events', (req, res) => {
    // 헤더 설정
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Content-Type', 'text/event-stream');

    // 클라이언트가 접속시 현재 시간
    const sendTime = () => {
        // 데이터는 "data:" 으로 시작해서 내용을 담고 "\n\n" 로 끝나는게 기본 프로토콜임
        res.write(`data: ${new Date().toISOString()}\n\n`)
    }

    // 주기적으로 전송
    const interval = setInterval(sendTime, 1000); // 1000ms

    req.on('close', () => {
        clearInterval(interval);
        console.log('사용자 도망감');
    })
});

app.listen(port, () => {
    console.log('서버 레디');
});
