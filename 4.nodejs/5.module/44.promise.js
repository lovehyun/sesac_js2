const myPromise = new Promise((resolve, reject) => {
    // 비동기작업 수행을 하는데...
    // 성공하면 resolve() 를 호출해줌
    // 실패하면 reject() 를 호출해줌
})

myPromise
    .then((result) => {
        // 성공했을때의 코드
    })
    .catch((error) => {
        // 실패했을때의 콛
    });

// 이전의 asyncOperations 라는 놈을...
function asyncOperation1(response, callback) {
    return new Promise((resolve, reject) => { 
        // 원래의 비동기처리
        setTimeout(() => {
            console.log('Operation1 completed');
            resolve('Response1')
        }, 1000);
    });
}

function asyncOperation2(response, callback) {
    return new Promise((resolve, reject) => { 
        setTimeout(() => {
            console.log('Operation2 completed', response);
            resolve('Response2')
        }, 1000);
    });
}

asyncOperation1()
    .then(response1 => asyncOperation2(response1))
    .then(response2 => asyncOperation1(response2))
    .then(response3 => asyncOperation2(response3))
    .then(response4 => {
        console.log('Final Result: ', response4);
    })
    .catch(error => {
        console.error('에러 발생: ', error);
    });

async function executeOperations() {
    try {
        const response1 = await asyncOperation1(null);
        const response2 = await asyncOperation2(response1);
        const response3 = await asyncOperation1(response2);
        const response4 = await asyncOperation2(response3);
        console.log('Final reponse: ', response4);
    } catch (error) {
        console.error('에러 발생: ', error);
    }
}

executeOperations();
