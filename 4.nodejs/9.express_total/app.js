// 외부 모듈 import
const express = require('express');
const path = require('path');

// 변수 정의
// 서버 설정
const app = express();
const PORT = 3000;

// 내부 자료구조
const users = {};

// 미들웨어
app.use('/static', express.static('static'));
app.use('/image', express.static('static/image'));

app.use(express.json()); // 요청의 바디에 application/json 이 있으면? req.body 에 담아줘

app.use((req, _, next) => {
    console.log(`LOG: ${req.method} ${req.url} `);
    next();
});

// 라우트
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'about.html'));
});

app.get('/user', (req, res) => {
    // res.type('text/plain');
    res.json(users);
    // res.send(JSON.stringify(users));
});

app.post('/user', (req, res) => {
    // const name = req.body.name;
    console.log(req.body);

    const { name } = req.body;
    users[name] = name;
    res.status(201).send('등록성공'); // 201 은 Created 
    // res.status(200).send('등록 성공'); // 201 은 Created 
});

app.put('/user/:id', (req, res) => { // id 받아오는것
    const id = req.params.id;
    users[id] = req.body.name;
    // delete users[id];
    // users[req.body.name] = req.body.name;
    res.status(200).send('수정 성공');
    // res.status(204).send();
});

app.delete('/user/:id', (req, res) => { // id 받아오는것
    const id = req.params.id;
    delete users[id];
    // res.status(200).send("삭제완료");
    res.status(204).send();
});

// 오류미들웨어
app.use((req, res) => {
    const errorpage = path.join(__dirname, 'static', '404.html');
    // res.status(404).send(`이 페이지(${req.url})는 없습니다.`);
    res.status(404).sendFile(errorpage);
})

// 서버시작
app.listen(PORT, () => {
    console.log(`서버가 ${PORT} 포트에서 대기 중입니다.`);
});
