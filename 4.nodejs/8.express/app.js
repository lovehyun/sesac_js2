const express = require('express');
const app = express();
const port = 3000;

// 라우트 '/' 생성
app.get('/', (req, res) => {
    res.send('<H1>Hello, Express</H1>');
});

app.get('/user', (req, res) => {
    res.send('<H1>여기는 사용자 페이지입니다.</H1>');
});

app.get('/admin', (req, res) => {
    res.send('<H1>여기는 관리자 페이지입니다.</H1>');
});

app.post('/', (req, res) => {
    res.send('POST요청이 /에 날라왔슴');
})

app.post('/user', (req, res) => {
    res.send('POST요청이 /user 에 날라왔슴');
})

app.put('/user', (req, res) => {
    res.send('PUT 요청이 /user 에 날라왔슴');
})

app.delete('/user', (req, res) => {
    res.send('DELETE 요청이 /user 에 날라왔슴');
})

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
