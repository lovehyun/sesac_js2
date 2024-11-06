// 외부 모듈 import
const express = require('express');
const path = require('path');

// 변수 정의
const app = express();
const PORT = 3000;
const users = {};

// 미들웨어
app.use('/static', express.static('static'));
app.use('/image', express.static('static/image'));

app.use(express.json());

// 라우트
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'about.html'));
});

app.get('/user', (req, res) => {
    res.json(users);
});

app.post('/user', (req, res) => {
    // const name = req.body.name;
    const { name } = req.body;
    users[name] = name;
    res.status(201).send('등록 성공'); // 201 은 Created 
});

app.put('/user', (req, res) => { // id 받아오는것
    res.send('여기 짜야함...');
});

app.delete('/user', (req, res) => { // id 받아오는것
    res.send('여기도 짜야함...');
});

// 오류미들웨어

// 서버시작
app.listen(PORT, () => {
    console.log(`서버가 ${PORT} 포트에서 대기 중입니다.`);
});
