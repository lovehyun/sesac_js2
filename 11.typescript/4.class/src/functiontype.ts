interface Calculate {
    (a: number, b: number): number; // 두개의 숫자를 받아서 하나의 숫자를 반환하는 함수 타입
}

const add: Calculate = (x, y) => x + y;
console.log(`덧셈: ${add(5, 10)}`)

const subtract: Calculate = (a, b) => a - b;
console.log(`뺄셈: ${subtract(5, 10)}`)

const multiply: Calculate = (a, b) => a * b;
console.log(`곱셈: ${multiply(5, 10)}`)
