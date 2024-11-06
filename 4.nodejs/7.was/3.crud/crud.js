const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const users = {};

const server = http.createServer((req, res) => {
    console.log(req.method, req.url);

    if (req.method === 'GET') {
        handleGetRequest(req, res);
    } else if (req.method === 'POST') {
        handlePostRequest(req, res);
    } else if (req.method === 'PUT') {
        handlePutRequest(req, res);
    } else if (req.method === 'DELETE') {
        handleDeleteRequest(req, res);
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

async function handleGetRequest(req, res) {
    try {
        if (req.url === '/') {
            const data = await fs.readFile('./index.html')
            res.end(data);
        } else if (req.url === '/about') {
            res.end('GET요청 /about 응답완료');
        } else if (req.url === '/user') {
            // console.log(users);
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
            res.end(JSON.stringify(users)); 
        } else if (req.url.startsWith('/static')) {
            // static 파일들을 전달
            const filePath = path.join(__dirname, req.url);
            try {
                const data = await fs.readFile(filePath);
                res.writeHead(200, {'Content-Type': 'application/javascript; charset=utf-8'})
                res.end(data);
            } catch {
                res.writeHead(404);
                res.end('Not Found');
            }
        } else {
            res.writeHead(404);
            res.end('Not Found');
        }
    } catch(err) {
        console.error(err);
        res.writeHead(500);
        res.end('알수 없는 오류');
    }
}

function handlePostRequest(req, res) {
    if (req.url === '/user') {
        let body = '';
        req.on('data', (data) => (body += data));
        req.on('end', () => {
            // 데이터가 다 쌓였을때 할일 여기에 작성
            if (req.headers['content-type'] === 'text/plain') {
                return res.end('plaintext 로 데이터를 줬구나...')
            } else if (req.headers['content-type'] === 'application/json') {
                const parsedData = JSON.parse(body);
                const username = parsedData.name;
                users[username] = username;
                return res.end(`application/json 이구나... body: ${body} json: ${parsedData}`);
            } else if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
                return res.end(`form으로 데이터를 잘 받았음.`)
            } else {
                res.writeHead(404);
                return res.end('Not Found')
            }
        });
    }
}

function handlePutRequest(req, res) {
    if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2];
        let body = '';
        req.on('data', (data) => (body += data));
        req.on('end', () => {
            if (users[key]) {
                try {
                    const parsedData = JSON.parse(body); // JSON 파싱 시 오류가 발생할 수 있음
                    users[key] = parsedData.name || users[key]; // name이 없을 경우 기본값 유지
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(users));
                } catch (error) {
                    console.error('JSON 파싱 또는 사용자 업데이트 오류:', error);
                    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
                    res.end('잘못된 요청 형식이거나 처리 중 오류가 발생했습니다.');
                }
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('사용자를 찾을 수 없습니다.');
            }
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
}

function handleDeleteRequest(req, res) {
    if (req.url.startsWith('/user/')) {
        const username = path.basename(req.url);
        if (username && users[username]) {
            delete users[username]; // 객체 안의 멤버 삭제하기
            res.writeHead(200, {'Content-Type': 'text-plain; charset=utf-8'});
            res.end(`${username} 삭제 성공`);
        } else {
            res.writeHead(404, {'Content-Type': 'text-plain; charset=utf-8'});
            res.end(`${username} 사용자를 찾을 수 없습니다.`);
        }
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
}


server.listen(3000, () => {
    console.log('서버가 3000 포트에서 대기 중입니다')
});
