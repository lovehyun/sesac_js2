const http = require('http');
const fs = require('fs');

// 우리의 fs 의 콜백기반의 비동기 함수를, promise 를 통해서,
// 일종의 status 를 반납받아서, await 로 대기(동기) 처리 하겠다... 
function readFilePromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err); // 오류 시 reject 호출
            } else {
                resolve(data); // 성공 시 resolve 호출
            }
        });
    })
}

http.createServer(async (req, res) => {
    try {
        const data = await readFilePromise('./index.html');
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        res.end(data);
    } catch (err) {
        console.error(err);
        res.writeHead(500, {'Content-Type':'text/html; charset=utf-8'});
        res.end('알수 없는 오류... 관리자 문의...');
    }

}).listen(3000, () => {
    console.log('서버 대기중.. on 3000번에서...');
});
