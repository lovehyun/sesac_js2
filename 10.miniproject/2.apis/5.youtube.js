const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.YOUTUBE_API_KEY;
if (!API_KEY) {
    console.error('YOUTUBE_API_KEY는 필수 입력 사항입니다.');
    process.exit(1);
}

const url = 'https://www.googleapis.com/youtube/v3/search';

const params = {
    part: 'snippet',
    q: '자바스크립트 개발',
    type: 'video',
    maxResults: 10,
    key: API_KEY
}

const fetchYoutube = async() => {
    try {
        const response = await axios.get(url, { params });
        const data = response.data;

        data.items.forEach(item => {
            const title = item.snippet.title; // 영상 제목
            const videoId = item.id.videoId; // 비디오클립ID
            const videoUrl = `https://www.youtube.com/watch?v=${videoId}`; // 우리가 만든 URL
            const description = item.snippet.description; // 영상 설명

            console.log(`영상제목: ${title}`);
            console.log(`URL주소: ${videoUrl}`);
            console.log(`설명: ${description}`);
            console.log('-'.repeat(40));
        })
    } catch (error) {
        console.error('요청실패: ', error.message);
    }
}

fetchYoutube();
