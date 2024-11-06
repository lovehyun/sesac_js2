const express = require('express');
const app = express();
const port = 3000;

function requestTime(req, res, next) {
    req.requestedTime = Date.now();
    next();
}

function myLogger(req, _, next) { // 미들웨어는 3개의 인자를 받는다. req, res, 나의 다음포인트...
    const formattedTime = new Date(req.requestedTime).toLocaleString();
    console.log(`LOG: ${formattedTime} - ${req.method} ${req.url}`);
    next();
}

// 미들웨어를 등록하는곳
app.use(requestTime);
app.use(myLogger);

app.get('/', (req, res) => {
    // console.log(`요청시간: ${req.requestedTime}`)
    const timeString = new Date(req.requestedTime).toString();
    res.send(`헬로우를 요청한 시간은 ${timeString}`);
});

function mymiddle1(req, res, next) {
    const 내변수1 = "테스트1"
    console.log(내변수1);
    next();
}

function mymiddle2(req, res, next) {
    console.log('테스트2');
    next();
}

app.get('/about', mymiddle1, mymiddle2, (req, res) => {
    res.send('about 페이지 입니다.');
})

app.get('/error', (req, res) => {
    throw new Error('강제로 에러 유발');
})

// 에러 처리용 미들웨어 추가 - 전체 중에 가장 마지막에 추가해야함
app.use((err, req, res, next) => {
    console.error('에러발생: ', err.message); // 콘솔에 에러 출력
    res.status(500).json({ message: '서버 내부 오류' });
})

app.listen(port, () => {
    console.log("서버 레디");
});
