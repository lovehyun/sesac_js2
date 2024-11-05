const http = require('http');

const server = http.createServer();

server.on('connection', () => {
    console.log('새로운 사용자가 접속합니다.');
});

server.on('request', (req, res) => {
    console.log('요청이 왔습니다: ');
    // console.log('req 중에 유용한 정보:');
    // console.log(`req.method = ${req.method}`);
    // console.log(`req.url = ${req.url}`);
    // console.log(req.headers);
    // console.log(`req.headers = ${req.headers}`);
    // console.log(`req.headers = ${JSON.stringify(req.headers)}`);
    // console.log(`req.headers['user-agent'] = ${req.headers['user-agent']}`);
    // console.log(`req.headers['content-type'] = ${req.headers['content-type']}`);
    // console.log(`req.socket.remoteAddress=${req.socket.remoteAddress}`);

    // 헤더(Header)
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    // 본문(Body)
    res.write('<H1>헬로우 노두</H1>');
    res.write('<H2>헬로우 노두</H2>');
    res.end('<P>안녕</P>');

    console.log('나의 요청에 대한 응답 처리완료');

    req.on('close', () => {
        console.log('클라이언트 접속 종료');
    });
});

server.listen(3000, () => {
    console.log('서버가 잘 시작되었습니다.');
    console.log('Server is running on http://localhost:3000');
});

server.on('close', () => {
    console.log('서버가 종료되었습니다.');
});

// 우리 서버를 10초뒤에 종료되도록....
// const timer = setTimeout(() => {
//     console.log('10초가 지나서 서버를 종료합니다...');
//     server.close();
// }, 10000); // 10초

// 우리가 키보드를 'q' 를 눌러서 종료되도록...
const readline = require('readline');  // 이렇게 코드 중간에 갑자기 require로 외부 모듈 불러오는건 좋지 않음..
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    if (input === 'q') {
        console.log('q키가 입력되었습니다.');
        server.close(); // 서버 닫고
        rl.close(); // 키보드 입력도 닫고
    }
})

console.log('서버 프로그램이 시작되었습니다.');
