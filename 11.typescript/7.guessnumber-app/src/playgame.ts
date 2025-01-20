import readlineSync from 'readline-sync';

class GuessNumberGame {
    private targetNumber: number;
    private attempts: number;
    private maxAttempts: number;
    
    constructor(maxAttempts: number = 10) {
        this.targetNumber = Math.floor(Math.random() * 100) + 1;
        this.attempts = 0;
        this.maxAttempts = maxAttempts;
    }

    private getFeedback(guess: number): string {
        if (guess < this.targetNumber) return 'Too Low!';
        if (guess > this.targetNumber) return 'Too High!';
        return 'Correct!';
    }

    public play(): void {
        console.log('안녕하세요, 숫자 맞추기 게임에 오신것을 환영합니다.');
        console.log(`최대 ${this.maxAttempts} 까지 1~100 까지의 숫자를 맞출 기회가 주어집니다.`);

        while (this.attempts < this.maxAttempts) {
            const input = readlineSync.questionInt(`Trial ${this.attempts + 1}: Guess Number? `);

            this.attempts++;
            const feedback = this.getFeedback(input);

            if (feedback === 'Correct!') {
                console.log(`축하합니다. ${this.attempts}/${this.maxAttempts} 번만에 맞췄습니다.`);
                return;
            } else {
                console.log(`틀렸습니다: ${feedback}`);
            }
        }

        console.log(`최대 시도 횟수 ${this.maxAttempts} 가 초과하였습니다. 안녕~~`)
    }
}

const mygame = new GuessNumberGame();
mygame.play();
