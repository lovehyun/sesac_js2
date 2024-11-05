const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    try {
        const data = await fs.readFile('./index.html');
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
