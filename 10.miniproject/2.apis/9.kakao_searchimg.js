require('dotenv').config()
const axios = require('axios');

const RESTAPI_KEY = process.env.KAKAO_RESTAPI_KEY;

const url = "https://dapi.kakao.com/v2/search/image";
const headers = {
    Authorization: `KakaoAK ${RESTAPI_KEY}`
}

const query = "아이유";

const params = {
    query: query,     // 필수
    sort: "accuracy", // 옵셔널
    page: 1,          // 옵셔널
    size: 10          // 옵셔널
}

axios.get(url, { headers, params })
    .then(response => {
        const data = response.data;
        console.log(data);
    });