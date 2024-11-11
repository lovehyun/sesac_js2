const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3000;

// 미들웨어 -->
app.use(session({
    secret: 'my-secret-1234',
    resave: false,
    saveUninitialized: true
}));

app.use(express.json()); // body-parser를 사용해서, 사용자의 요청중에 application/json 을 body라는 변수에 담아줌

app.use(express.static('public'));
// 미들웨어 <--

// 계정, 상품정보 등
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
];

const products = [
    { id: 1, name: "상품1", price: 2000 },
    { id: 2, name: "상품2", price: 3000 },
    { id: 3, name: "상품3", price: 1500 },
];

// 메인 라우트들 -->
app.get('/', (req, res) => {
    const user = req.session.user;
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});

app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'products.html'));

});
// 메인 라우트들 <--

// REST-API 들 -->
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password)

    if (user) {
        req.session.user = user; // 로그인 성공 시 해당 사용자 정보를 세션에 저장해둠
        res.json({ message: '로그인 성공', username: user.username });
    } else {
        res.status(401).json({ message: '로그인 실패' });
    }
});

app.get('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).json({ message: "잉;; 로그아웃 실패" });
        } else {
            res.json({ message: '로그아웃 성공', redirectUrl: '/' });
        }
    });
});

app.get('/api/check-login', (req, res) => {
    const user = req.session.user;

    if (user) {
        res.json({ username: user.username });
    } else {
        res.status(401).json({ message: '인증되지 않은 사용자' });
    }
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/cart', (req, res) => {

});

app.post('/api/cart', (req, res) => {

});

app.put('/api/cart', (req, res) => {

});

app.delete('/api/cart', (req, res) => {

});

// REST-API 들 <--

app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});
