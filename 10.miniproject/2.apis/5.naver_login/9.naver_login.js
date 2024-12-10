require('dotenv').config();
const express = require('express');
const session = require('express-session');
const axios = require('axios');
const path = require('path');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

const CLIENT_ID = process.env.NAVER_CLIENT_ID;
const CLINET_SECRET = process.env.NAVER_CLIENT_SECRET;
const REDIRECT_URL = 'http://localhost:3000/callback';

// 네이버 로그인 URL
const NAVER_AUTH_URL = 'https://nid.naver.com/oauth2.0/authorize';
const NAVER_TOKEN_URL = 'https://nid.naver.com/oauth2.0/token';

// 사용자의 개인정보를 조회하기위한 URL (access 토큰을 기반으로, 사용자 정보를 더 요청할수 있다. (사용자가 동의한 경우))
const NAVER_USERINFO_URL = 'https://openapi.naver.com/v1/nid/me';

// 미들웨어
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(session({
    secret: 'my-secret-key-1234', // 세션 암호화 키
    resave: false,
    saveUninitialized: true
}));

// 로그인 요청
app.get('/login', (req, res) => {
    // 네이버로 가라고 한다
    const state = Math.random().toString(36).substring(7); // 36진수(0-9a-z) = 13자리중 6자리만 사용
    // console.log(state);

    const authUrl = `${NAVER_AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_url=${REDIRECT_URL}&state=${state}`

    // console.log(authUrl);
    res.redirect(authUrl); // "여기 가서 확인하고 오세요~~~" 라고 네이버로 보냈음..
});

app.get('/callback', async (req, res) => {
    // 인증 끝나고 돌아왔다. (token을 기반으로 내가 할일을 한다)
    // token 검증
    const { code, state } = req.query;
    // console.log(code, state);

    const tokenResponse = await axios.get(NAVER_TOKEN_URL, {
        params: {
            grant_type: 'authorization_code',
            client_id: CLIENT_ID,
            client_secret: CLINET_SECRET,
            redirect_url: REDIRECT_URL,
            code: code,
            state: state,
        }
    });

    // 최종적으로 부여받는게, 이 사용자용 accessToken임...
    const accessToken = tokenResponse.data.access_token;

    // 사용자 정보 주세요~~~
    const userInfoResponse = await axios.get(NAVER_USERINFO_URL, {
        headers: {
            Authorization: `Bearer ${accessToken}`, // 가장 일반적인 규약임
        }
    });

    const userInfo = userInfoResponse.data.response;

    // const additionalUserInfo = {
    //     nickname: userInfo.nickname || '미동의',
    //     gender: userInfo.gender || '미동의',
    //     email: userInfo.email || '미동의',
    //     age: userInfo.age || '미동의',
    //     birthyear: userInfo.birthyear || '미동의',
    //     birthday: userInfo.birthday || '미동의'
    // };

    // console.log(additionalUserInfo);

    req.session.user = {
        nickname: userInfo.nickname || '미동의',
        gender: userInfo.gender || '미동의',
        email: userInfo.email || '미동의',
        age: userInfo.age || '미동의',
        birthyear: userInfo.birthyear || '미동의',
        birthday: userInfo.birthday || '미동의'
    }

    // res.send(`로그인 성공: ${accessToken}`);
    // res.send(`
    //     <h2>로그인 성공</h2>
    //     <p>닉네임: ${additionalUserInfo.nickname}</p>
    //     <p>이메일: ${additionalUserInfo.email}</p>
    //     <p>나이: ${additionalUserInfo.age}</p>
    //     <p>생일: ${additionalUserInfo.birthday}</p>
    //     `);
    res.redirect('/dashboard');
});

// 로그인 확인을 위한 미들웨어
function loggedIn(req, res, next) {
    if (req.session?.user) {
        return next();
    } else {
        res.status(403).send('권한이 없다...');
        // res.status(403).sendFile(path.join(__dirname, 'public', 'error.html'));
    }
}

app.get('/dashboard', loggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/api/user', (req, res) => {
    // 여기에서 사용자 정보를 반납
    res.json(req.session?.user); // <-- 이거 채워야함.
})

app.get('/logout', (req, res) => {
    // 세션 삭제
    req.session.destroy((err) => {
        if (err) {
            console.log('세션 삭제 실패');
        }
        res.redirect('/');
    })
})

app.listen(PORT, () => {
    console.log('서버 레디');
});
