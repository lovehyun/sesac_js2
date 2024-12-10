const fetch = require('node-fetch');
const axios = require('axios');
// import fetch from 'node-fetch';
// import axios from 'axios';

async function fetchexample() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        if (!response.ok) {
            console.log('에러');
            return;
        }

        const data = await response.json();
        console.log('fecth 데이터: ', data.title);
    } catch (error) {
        console.log('fetch 통신오류');
    }
}

async function axiosexample() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        // console.log('응답코드: ', response.status);
        console.log('axios 데이터: ', response.data.title);
    } catch (error) {
        console.log('axios 통신오류');
    }
}

(async () => {
    await fetchexample();
    await axiosexample();
})();
