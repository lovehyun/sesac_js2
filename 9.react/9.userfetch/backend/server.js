const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

// const users = [
//     { id: 1, name: 'Alice' },
//     { id: 2, name: 'Bob' },
//     { id: 3, name: 'Charlie' },
// ]

const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com', age: 25 },
    { id: 2, name: 'Bob', email: 'bob@example.com', age: 30  },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 35  },
]

// 각종 미들웨어 셋업
// app.use(cors()); // 나는 모든거 다 허용할거야. 끝~ (보안 최악)
app.use(cors({
    origin: ['http://localhost:3001', 'http://127.0.0.1:3001', 'https://my-domain.com', 'http://my-domain.com'],
    methods: ['GET', 'POST'],
}));
app.use(morgan('dev')); // 기본 개발자 디버깅

// API 라우트 셋업
app.get('/api/users', (req, res) => {
    // db가 커졌으니... /api/users 전체를 요청할때는, 이 많은것중에 id, name만 전달한다.
    const summary = users.map(u => ({id: u.id, name: u.name}));

    res.json(summary);
});

app.get('/api/users/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({error: 'User not found'});
    }

    // console.log(user);

    res.json(user);
});

app.listen(3000, () => {
    console.log('서버레디');
});
