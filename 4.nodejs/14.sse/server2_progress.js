const express = require('express');
const path = require('path');
const cors = require('cors');

const port = 3000;

const app = express();
app.use(cors()); // 모든 origin 다 허용

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'progress2.html'));
});

// SSE 엔드포인트
app.get('/progress', (req, res) => {
    // 헤더 설정
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Content-Type', 'text/event-stream');

    let progress = 0;

    // 주기적으로 전송
    const interval = setInterval(() => {
        progress += 10;
        res.write(`data: ${JSON.stringify({ progress })}\n\n`);

        if (progress >= 100) {
            clearInterval(interval);
            res.end();
        }
    }, 500); // 500ms

    req.on('close', () => {
        clearInterval(interval);
        console.log('사용자 도망감');
    })
});

app.listen(port, () => {
    console.log('서버 레디');
});
