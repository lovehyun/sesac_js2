function triangle() {
    // for, while 반복문을 통해서...
    console.log("*");
    console.log("**");
    console.log("***");
    console.log("****");
    console.log("*****");
}

// 1. 먼저 함수로 각각 출력한다.
function leftTriangle() {
    let rows = 5;
    let currentRow = 1;
    while (currentRow <= rows) {
        // 매줄 카운팅은 성공했고,
        // 매번 별의 갯수를 늘린다.
        let stars = "";
        let starCount = 1;
        while (starCount <= currentRow) {
            stars += "*"
            starCount++;
        }
        console.log(stars);
        currentRow++;
    }
}

function leftInvertTriangle() {
    let rows = 5;
    let currentRow = rows;
    while (currentRow >= 1) {
        // 매줄 카운팅은 성공했고,
        // 매번 별의 갯수를 줄인다.
        let stars = "";
        let starCount = 1;
        while (starCount <= currentRow) {
            stars += "*"
            starCount++
        }
        console.log(stars);
        currentRow--;
    }
}

leftTriangle();
// rightTriangle();
leftInvertTriangle();
// rightInvertTriangle();
// equalTriangle();
// equalIntertTriangle();

// 1-2. 함수로 row 를 입력받는다.
// leftTriangle(5);
// leftTriangle(10);
