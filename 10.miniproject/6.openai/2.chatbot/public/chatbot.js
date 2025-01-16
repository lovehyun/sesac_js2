const questionInput = document.getElementById('questionInput');
const sendButton = document.getElementById('sendButton');
const chatContainer = document.getElementById('chatContainer');

function addMessage(content, isUser=true) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    if (isUser) {
        messageDiv.classList.add('user-message');
    } else {
        messageDiv.classList.add('bot-message');
    }

    messageDiv.innerHTML = `
        <div class="sender">${isUser ? '사용자' : 'AI챗봇'}</div>
        <div class="content">${content}</div>
    `
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    if (!isUser) {
        readText(content);
    }
}

async function sendMessage() {
    const question = questionInput.value.trim();
    addMessage(question);
    questionInput.value = '';

    try {
        const response = await fetch('/api/chat', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question })
        })

        const data = await response.json();
        console.log(data)
        if (data.answer) {
            addMessage(data.answer, false);
        }
    } catch (error) {
        console.error('에러발생:', error.message)
    }
}

sendButton.addEventListener('click', sendMessage);
questionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function readText(text) {
    // 음성 목록에서 적합한 한국어 음성 선택
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR'; // 한국어로 설정
    utterance.rate = 3.0; // 음성 속도를 빠르게 설정 (기본값: 1)
    speechSynthesis.speak(utterance);
}
