console.log("0. 타이머를 통한 비동기처리");

setTimeout(() => {
    console.log("1. 첫번째 작업: 1초후 실행")
}, 1000); // 1초

// 기다리고 싶으면??

setTimeout(() => {
    console.log("2. 두번째 작업: 2초후 실행")
}, 2000); // 2초

// 기다리고 싶으면??

setTimeout(() => {
    console.log("3. 세번째 작업: 3초후 실행")
}, 3000); // 3초

// 기다리고 싶으면??

console.log("4. 모든 작업이 완료되었습니다.");
