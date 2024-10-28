const readline = require('readline');

// 이걸 통해서 사용자로부터 입출력이 가능해짐.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('출력할 데이터 유형을 선택하세요 (user, order, item, store): ', (input) => {
    const num = parseInt(input);
    if (isNaN(num) || num < 0 || num > 9) {
        console.log('올바른 입력값이 아닙니다.');
        rl.close();
        return;
    }

    console.log(`${input} 단을 입력하셨습니다.'`);

    // 입력받은 단의 구구단을 출력하시오.
    for (let i = 1; i <= 9; i++) {
        console.log(`${input} * ${i} = ${input * i}`);
    }

    rl.close(); // 입출력 처리 종료
});

