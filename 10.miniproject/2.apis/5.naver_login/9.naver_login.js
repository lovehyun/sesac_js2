require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

const CLIENT_ID = process.env.NAVER_CLIENT_ID;
const CLINET_SECRET = process.env.NAVER_CLIENT_SECRET;
const REDIRECT_URL = 'http://localhost:3000/callback';

// 네이버 로그인 URL
const NAVER_AUTH_URL = 'https://nid.naver.com/oauth2.0/authorize';
const NAVER_TOKEN_URL = 'https://nid.naver.com/oauth2.0/token';
const NAVER_USERINFO_URL = 'https://openapi.naver.com/v1/nid/me';

// 미들웨어
app.use(express.static('public'));

// 로그인 요청
app.get('/login', (req, res) => {
    // 네이버로 가라고 한다
    const state = Math.random().toString(36).substring(7);
    console.log(state);

    const authUrl = `${NAVER_AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_url=${REDIRECT_URL}&state=${state}`

    console.log(authUrl);
    res.redirect(authUrl);
});

app.get('/callback', async (req, res) => {
    // 인증 끝나고 돌아왔다. (token을 기반으로 내가 할일을 한다)
    // token 검증
    const { code, state } = req.query;
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

    const accessToken = tokenResponse.data.access_token;
    res.send(`로그인 성공: ${accessToken}`);
});

app.listen(PORT, () => {
    console.log('서버 레디');
});
