let id: number | string;

id = 123; // 숫자 할당
console.log(`아이디는? ${id}`);

id = 'ABC'; // 문자열도 할당 가능
console.log(`아이디는? ${id}`);

// literal type
let direction: 'left' | 'right' | 'up' | 'down';

direction = 'left';
// direction = 'LEFT';   // 이건 다른 글자임
// direction = 'stop';
console.log(`Direction: ${direction}`);
