// 사용자로부터 입력받는다.. 숫자와 부호와 숫자를 입력받아서 연산...
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// 덧셈 함수
const add = (num1, num2) => {
    return num1 + num2;
};

// 뺄셈 함수
const subtract = (num1, num2) => {
    return num1 - num2;
};

// 곱셈 함수
const multiply = (num1, num2) => {
    return num1 * num2;
};

// 나눗셈 함수
const divide = (num1, num2) => {
    if (num2 === 0) {
        return "Error: Division by zero is not allowed";
    }
    return num1 / num2;
};

// const calculator = (num1, operator, numn2) => {
//     return 0;
// }

const calculator = (num1, operator, num2) => {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return "Invalid operator";
    }
};

const getUserInput = () => {
    readline.question('첫번째 숫자를 입력하시오: ', (num1) => {
        readline.question('연산자를 입력하시오 (+,-,*,/): ', (operator) => {
            readline.question('두번째 숫자를 입력하시오: ', (num2) => {
                const number1 = parseFloat(num1);
                const number2 = parseFloat(num2);

                const result = calculator(number1, operator, number2);
                console.log(`결과: ${result}`);
                readline.close();
            });
        });
    });
}

getUserInput(); // 함수 호출
