// 사용자로부터 입력받는다.. 숫자와 부호와 숫자를 입력받아서 연산...

class Calculator {
    // 덧셈 함수
    add(num1, num2) {
        return num1 + num2;
    };

    // 뺄셈 함수
    subtract(num1, num2) {
        return num1 - num2;
    };

    // 곱셈 함수
    multiply(num1, num2) {
        return num1 * num2;
    };

    // 나눗셈 함수
    divide(num1, num2) {
        if (num2 === 0) {
            return "Error: Division by zero is not allowed";
        }
        return num1 / num2;
    };

    calculate(num1, operator, num2) {
        switch (operator) {
            case '+':
                return this.add(num1, num2);
            case '-':
                return this.subtract(num1, num2);
            case '*':
                return this.multiply(num1, num2);
            case '/':
                return this.divide(num1, num2);
            default:
                return "Invalid operator";
        }
    };
}

class UserInput {
    constructor(calculator) {
        this.calculator = calculator;
        this.readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    getUserInput() {
        this.readline.question('첫번째 숫자를 입력하시오: ', (num1) => {
            this.readline.question('연산자를 입력하시오 (+,-,*,/): ', (operator) => {
                this.readline.question('두번째 숫자를 입력하시오: ', (num2) => {
                    const number1 = parseFloat(num1);
                    const number2 = parseFloat(num2);

                    const result = this.calculator.calculate(number1, operator, number2);
                    console.log(`결과: ${result}`);
                    this.readline.close();
                });
            });
        });
    }

    start() {
        this.getUserInput();
    }
}

const calculator = new Calculator();
const userInput = new UserInput(calculator);

userInput.start();
