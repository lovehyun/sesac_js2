// 미션1.
// 1. 랜덤 숫자 1~100 까지를 생성한다
const random = Math.floor(Math.random() * 100) + 1;

// 2. Guess 버튼을 통해 입력한 숫자와 내 숫자가 맞는지 비교한다.
// document.addEventListener("DOMContentLoaded", function() {
// });

function checkGuess() {
    const guess = document.getElementById("guessNumber").value; // parseInt, Number
    const result = document.getElementById("result");
    const historyList = document.getElementById("historyList");

    console.log("랜덤: " + random + ", 추측: " + guess);
    if (guess < random) {
        result.innerHTML = "<B>Too Low</B>";
    } else if (guess > random) {
        result.innerHTML = "<B>Too High</B>";
    } else {
        result.innerHTML = "<B>Correct</B>";
    }

    // 3항 연산자
    // (조건문) ? true : false
    result.innerHTML = (guess < random) ? "Too Low" 
        : (guess > random) ? "Too High" 
        : "Correct";

    // 히스토리 기록
    const listItem = document.createElement("li");
    listItem.textContent = `예측숫자: ${guess}`;
    historyList.appendChild(listItem);
}

// 2-1. 입력한 숫자가 더 크면?? Too High 라고 알려주기
// 2-2. 입력한 숫자가 더 작으면?? Too Low 라고 알려주기
// 2-3. 같으면?? Correct 라고 알려주기


// 미션2.
// 3. 입력한 값들의 로그를 출력하기


// 미션3.
// 4. 이걸 내가 풀어가는 사람 입장에서, 최소화해서 푸는 기법을 뭐라고 부르는가? 
//    이런 알고리즘을 우리가 뭐라고 부르는가?? 그 이름을 작성하기.. (= 알고리즘)
// 4-2. 최대(아무리 많이 찍더라도) 몇번만에 이 문제를 (무조건) 풀 수 있는가?? 그 횟수는??

const button = document.getElementById("guessButton");
button.addEventListener("click", checkGuess);
