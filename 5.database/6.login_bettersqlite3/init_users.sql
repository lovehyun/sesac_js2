-- 사용자 테이블 생성
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    username TEXT, 
    password TEXT
);

-- 초기 사용자 추가
INSERT INTO users (username, password) VALUES 
    ('admin', 'sfhk#fa2@'),
    ('user1', 'password1'),
    ('user2', 'password2'),
    ('user3', 'password3');
