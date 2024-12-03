import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Counter from './Counter';
import Message from './Message';
import Input from './Input';

const App = () => {
    const pageTitle = 'Welcome to My Website';

    const [count, setCount] = useState(5); // State 선언
    const [message, setMessage] = useState(''); // 입력메세지 컬럼의 초기값

    return (
        <div className="App">
            <Header title={pageTitle}/>
            <main className="App-header">
                <h1>Hello, World!</h1>
                <p>안녕하세요, 리엑트 학습자 여러분</p>
                <Counter count={count} setCount={setCount} />
                <Message count={count} message={message}/>
                <Input setMessage={setMessage}/>
            </main>
            <Footer />
        </div>
    );
}

export default App;
