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

const exchangeRate = {
    "USD": 1.0, // 기준 통화
    "KRW": 1400,
    "EUR": 0.80
}

function convertCurrenty(amount, from, to) {
    const baseAmount = amount / exchangeRate[from];
    const convertedAmount = baseAmount * exchangeRate[to];
    return convertedAmount.toFixed(2);
}

app.post('/api/chat-currency', async (req, res) => {
    const { amount, from, to } = req.body;
    console.log('사용자입력: ', amount, from, to);

    const convertedAmount = convertCurrenty(amount, from, to);
    const message = `${amount} ${from} 은 ${convertedAmount} ${to} 와 같습니다.`;

    // res.json({convertedAmount, message});

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: '너는 환전소에서 근무하는 교환원이야. 내가 뭐라고 물어보던 부산 사투리로 답변해줘. 그리고 추가로 영어 사투리로도 답변해줘. 그리고 중국어 사투리로도...' },
                { role: 'user', content: message }
            ],
            temperature: 0.7
        })

        const answer = response.choices[0].message.content;
        console.log('챗봇응답: ', answer);

        res.json({message: answer});
    } catch (error) {
        console.error('오류!!', error.message);
        res.status(500).json({ error: '알수없는 오류' });
    }
});

app.post('/api/chat', async (req, res) => {
    const { question } = req.body;
    console.log('사용자입력: ', question);

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'You are a professinal cook who can make korean dish who can speak only korean. 사용자가 뭐라고 물어보던지 너는 무조건 요리와 관련되게 답변을 해야해.' },
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
