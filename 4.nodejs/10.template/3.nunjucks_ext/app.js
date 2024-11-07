// npm i express nunjucks
const express = require('express');
const nunjucks = require('nunjucks');

const app = express();

app.set('view engine', 'html');

nunjucks.configure('views', {
    autoescape: true, // 입력값 처리할때 XSS 같은것 발생하지 않도록 처리하는 기능
    express: app,
});

app.get('/', (req, res) => {
    const data = {
        title: 'My Page',
        content: 'This is my content page'
    }
    res.render('main', data)
});

app.get('/user', (req, res) => {
    const data = {
        title: '사용자 Page',
        content: 'This is 사용자 content page'
    }
    res.render('user', data)
});

app.get('/product', (req, res) => {
    const data = {
        title: '상품 Page',
        content: 'This is 상품 content page'
    }
    res.render('product', data)
});

app.get('/page1', (req, res) => {
    const data = {
        title: '상속하는 스타일',
        content: 'This is 상속받은 page1의 content page'
    }
    res.render('page1', data)
});

app.get('/page2', (req, res) => {
    const data = {
        title: '상속하는 스타일',
        content: 'This is 상속받은 page2의 content page'
    }
    res.render('page2', data)
});

app.get('/page3', (req, res) => {
    const data = {
        title: '상속하는 스타일',
        content: 'This is 상속받은 page3의 content page'
    }
    res.render('page3', data)
});

app.listen(3000, () => {
    console.log('서버 레디');
});
