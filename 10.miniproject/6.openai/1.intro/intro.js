const axios = require('axios');
require('dotenv').config();

const openaiApiKey = process.env.OPENAI_API_KEY;
const url = 'https://api.openai.com/v1/chat/completions';

async function getChatGPTResponse(userInput) {
    try {
        const response = await axios.post(url,
            {
                model: 'gpt-4o-mini',
                messages: [
                    {role: 'system', content: userInput}
                ],
                temperature: 1.0 // 0~1사이의 값. 1.0 으로 갈수록 창의적..
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${openaiApiKey}`,
                },
            },
        )
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('API 요청 실패', error.message)
        if (error.response) {
            const status = error.response.status;
            if (status === 401) {
                console.error('API키가 잘못되었습니다.')
            } else if (status === 429) {
                console.error(`크레딧 만료 (또는 과도한 요청)`)
            }
        }
        return '챗봇 응답을 가져오는도중에 오류가 발생했습니다.'
    }
    
}

async function chatWithUser() {
    const userInput = '안녕, 챗봇! 나 오늘 기분이 꿀꿀해...';
    const aiResponse = await getChatGPTResponse(userInput);
    console.log('챗봇응답: ', aiResponse);
}

chatWithUser();
// setInterval(chatWithUser, 1000); 