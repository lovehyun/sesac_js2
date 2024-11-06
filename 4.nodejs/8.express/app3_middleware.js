const express = require('express');
const app = express();
const port = 3000;

function myLogger(req, _, next) { // 미들웨어는 3개의 인자를 받는다. req, res, 나의 다음포인트...
    console.log(`LOG: ${req.method}, ${req.url}`);
    next();
}

function mySecurity(req, _, next) {
    console.log('나의 2번째 함수');
    console.log(`요청시간: ${req.requestedTime}`)
    req.requestedTime = Date.now();
    console.log(`요청시간: ${req.requestedTime}`)
    next();
}

function myAuth(req, _, next) {
    console.log('나의 3번째 함수');
    console.log(`요청시간: ${req.requestedTime}`)
    next();
}



// 미들웨어를 등록하는곳
app.use(myLogger);
app.use(mySecurity);
app.use(myAuth);
app.use((req, res, next) => {
    console.log('나의 4번째 함수');
    next();
});

app.get('/', (req, res) => {
    // console.log(`요청시간: ${req.requestedTime}`)
    const timeString = new Date(req.requestedTime).toString();
    res.send(`헬로우를 요청한 시간은 ${timeString}`);
});

app.listen(port, () => {
    console.log("서버 레디");
});
