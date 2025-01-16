const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

if (!openai.apiKey) {
    console.error('키 오류!!');
    process.exit(1);
}

async function getChatGPTResponse(userInput) {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'You are a professinal cook who can make korean dish who can speak only korean' },
                { role: 'user', content: userInput }
            ],
            temperature: 0.7
        })

        return response.choices[0].message.content;
    } catch (error) {
        console.error('오류!!', error.message);
    }
}

async function chatWithUser() {
    const userInput = '안녕, 챗봇! 나 오늘 기분이 꿀꿀해...';
    const aiResponse = await getChatGPTResponse(userInput);
    console.log('챗봇응답: ', aiResponse);
}

chatWithUser();
