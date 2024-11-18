// 라이브러리 추가
require('dotenv').config();
const express = require('express');
// const sqlite3 = require('sqlite3');
const sqlite3 = require('sqlite3').verbose(); // 이건 개발 환경에서만 사용
const path = require('path');

// 변수 정의
const PORT = 3000;
const db = new sqlite3.Database(process.env.DB_PATH);
const app = express();

// 미들웨어 추가
app.use(express.static('public'));

// 라우트 정의
app.get('/', (req, res) => {
    // 여기는 도달하지 않음.. public 을 미들웨어로 노출한 경우에는...
    res.sendFile(path.resolve('public/index.html'));
});

app.get('/api/search', (req, res) => {
    const { searchQuery, page = 1 } = req.query; // 페이지는 기본 1페이지로 셋팅

    console.log(`사용자입력: ${searchQuery}, 페이지: ${page}`);
    const itemsPerPage = 10; // 페이지당 열개만 출력
    const offset = (page - 1) * itemsPerPage; // 산수 계산을 통해서.. 내 페이지를 원하는 offset이 맞는지 확인할것..

    // 사용자가 요청한 내용이 몇개나 있고, 그게 몇페이지가 될건지 계산하기...
    const countSql = `SELECT COUNT(*) AS count FROM artists WHERE name LIKE ?`;
    db.get(countSql, [`%${searchQuery}%`], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500);
        }
        const totalPage = Math.ceil(row.count / itemsPerPage);
        console.log(`갯수: ${row.count}, 전체페이지수: ${totalPage}`);

        const sql = `SELECT * FROM artists WHERE name LIKE ? LIMIT ? OFFSET ?`;
        db.all(sql, [`%${searchQuery}%`, itemsPerPage, offset], (err, rows) => {
            res.json({ results: rows, currentPage: page, totalPage: totalPage, status: "ok" });
        });
    });


});

app.listen(PORT, () => {
    console.log('서버 레디');
});
