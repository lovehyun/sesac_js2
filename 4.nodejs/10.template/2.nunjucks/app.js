// npm i express nunjucks
const express = require('express');
const nunjucks = require('nunjucks');

const app = express();

// app.set('view engine', 'njk');
app.set('view engine', 'html');

nunjucks.configure('views', {
    autoescape: true, // 입력값 처리할때 XSS 같은것 발생하지 않도록 처리하는 기능
    express: app
});

app.get('/', (req, res) => {
    // 기본값은 njk 임.. 그래서 index.njk 를 찾음..
    res.render('index', {title: '익스프레스웹', message: '웰컴투 Nunjucks'});
    // res.render('index.html', {title: '익스프레스웹', message: '웰컴투 Nunjucks'});
});

app.get('/fruits', (req, res) => {
    const fruits = ['Apple', 'Banana', 'Orange', 'Graphs'];
    res.render('fruits', {fruits: fruits});
});

app.get('/greeting', (req, res) => {
    const username = 'shpark'; // 실제로는 이건 DB에서 가져오는 로직이 있을거고...
    res.render('greeting', { username });
})

app.get('/welcome', (req, res) => {
    const isAdmin = false; // 나중에는 실제 사용자 권한으로...
    res.render('welcome', { isAdmin })
})

app.listen(3000, () => {
    console.log('서버 레디');
});
