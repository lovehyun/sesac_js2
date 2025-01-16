const express = require('express');
const morgan = require('morgan');
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

if (!openai.apiKey) {
    console.error('키 오류!!');
    process.exit(1);
}

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
    const { question } = req.body;
    console.log('사용자입력: ', question);

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            // model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a professinal cook who can make korean dish who can speak only korean. 묻는 질문에 대해서 언제나 100글자 이하로 답변해줘.' },
                { role: 'user', content: question }
            ],
            temperature: 0.7
        })

        const answer = response.choices[0].message.content;
        console.log('챗봇응답: ', answer);

        res.json({answer});
    } catch (error) {
        console.error('오류!!', error.message);
        res.status(500).json({ error: '알수없는 오류' });
    }
});

app.listen(3000, () => {
    console.log('서버레디');
});
