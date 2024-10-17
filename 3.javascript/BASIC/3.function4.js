// -------------------------
// add(+), subtract(-), multiply(*), division(/)
// 4개의 함수를, 일반 함수로도 짜보시고, 화살표 함수...

// 일반 함수로 4개 구현
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function division(a, b) {
    if (b == 0) {
        console.log('분모는 0일수 없습니다.')
    } else {
        return a / b;
    }
}

console.log(add(2,3));
console.log(subtract(3,4));
console.log(multiply(4,5));
console.log(division(5,0));

// 화살표 함수로 4개 구현
const addArrow = (a, b) => a + b;
const subArrow = (a, b) => a - b;
const mulArrow = (a, b) => a * b;
const divArrow = (a, b) => a / b;

console.log(addArrow(2,3));
console.log(subArrow(3,4));
console.log(mulArrow(4,5));
console.log(divArrow(5,6));
