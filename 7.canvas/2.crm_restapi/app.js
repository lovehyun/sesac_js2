const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'revenue.html'));
});

app.get('/gender_dist_data', (req, res) => {
    const db = new sqlite3.Database('user-sample.db', (err) => {
        if (err) {
            console.error('파일없다!');
        } else {
            console.log('DB 로딩 성공');
        }
    });

    // 원하는 쿼리문
    db.all(`
        SELECT
            CASE
                WHEN Age BETWEEN 10 AND 19 THEN '10대'
                WHEN Age BETWEEN 20 AND 29 THEN '20대'
                WHEN Age BETWEEN 30 AND 39 THEN '30대'
                WHEN Age BETWEEN 40 AND 49 THEN '40대'
                WHEN Age BETWEEN 50 AND 59 THEN '50대'
                WHEN Age >= 60 THEN '60대이상'
            END AS AgeGroup,
            Gender,
            COUNT(*) AS UserCount
        FROM users
        GROUP BY AgeGroup, Gender;
    `, [], (err, rows) => {
        if (err) {
            console.error('쿼리 실패!!')
        } else {
            console.log(rows);

            // TODO 우리의 코드로 아래 내용 만든다.. 숙제!!
            
            // 데이터를 가공... 원하는걸로...
            // labels: ['10대', '20대', '30대', '40대', '50대']
            // maleCount: [100, 124, 128, 107, 29]
            // femaleCount: [101, 135, 126, 117, 33]

            const chartData = {
                labels: ['10대', '20대', '30대', '40대', '50대'],
                maleCount: [100, 124, 128, 107, 29],
                femaleCount: [101, 135, 126, 117, 33]
            }

            console.log(chartData);
            res.json(chartData);
        }
    });
});

app.get('/revenue_data', (req, res) => {
    const db = new sqlite3.Database('user-sample.db', (err) => {
        if (err) {
            console.error('파일없다!');
        } else {
            console.log('DB 로딩 성공');
        }
    });

    // 원하는 쿼리문
    db.all(`
        SELECT 
            strftime('%Y-%m', "orders"."OrderAt") AS YearMonth,
            SUM(items.UnitPrice) AS MonthlyRevenue,
            COUNT(order_items.ItemId) AS ItemCount
        FROM 
            "orders"
        JOIN 
            "order_items" ON "orders"."Id" = "order_items"."OrderId"
        JOIN 
            "items" ON "order_items"."ItemId" = "items"."Id"
        WHERE 
            "orders"."OrderAt" >= '2023-01-01' AND "orders"."OrderAt" <= '2023-12-31'
        GROUP BY 
            strftime('%Y-%m', "orders"."OrderAt")
        ORDER BY 
            strftime('%Y-%m', "orders"."OrderAt")
    `, [], (err, rows) => {
        if (err) {
            console.error('쿼리 실패!!')
        } else {
            // console.log(rows);
            
            // 프런트가 원하는 데이터 형태로 가공해서 주면 좋지 않을까???
            // 친철한 김백엔드씨가... 데이터를 잘 가공해주겠습니다.
            const labels = [];
            const revenues = [];

            for (const row of rows) {
                // 우리는 모두 김백엔드씨가 되어서... 데이터를 가공하면 됨...
                labels.push(row.YearMonth);
                revenues.push(row.MonthlyRevenue);
            }

            const chartData = {
                labels: labels,
                revenues: revenues
            };

            // console.log(chartData);

            res.json(chartData);
        }
    });

    // res.json();
});

app.listen(port, () => {
    console.log('서버 레디');
});

