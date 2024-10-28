const names = ['John', 'Jane', 'Michael', 'Emily', 'William', 'Olivia'];
const lastname = ['박', '김', '이', '조', '최'];
const firstname = ['가', '나', '다', '라', '마'];
const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia']

function generateName() {
    // return names[Math.floor(Math.random() * names.length)]
    return lastname[Math.floor(Math.random() * lastname.length)] + firstname[Math.floor(Math.random() * firstname.length)];
}

function generateGender() {
    return Math.random() < 0.5 ? "남성" : "여성";
}

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateBirthdate() {
    // YYYY-MM-DD 포멧으로 반환하기.
    // const year = Math.floor(Math.random() * (2010 - 1960 + 1)) + 1960;
    const year = getRandomInRange(1960, 2010);
    // const month = Math.floor(Math.random() * 12) + 1;
    const month = getRandomInRange(1, 12);
    // const day = Math.floor(Math.random() * 28) + 1;  // 1~28일까지가 나옴
    const day = getRandomInRange(1, 28);

    return `${year}-${month}-${day}`
}

function generateYYYY() {
    // 1960 - 2010 이런걸 하려면???
    let year = 0;

    // while (true) {
    //     year = Math.floor(Math.random() * 10000);
    //     if (year >= 1960 && year <= 2010) {
    //         break;
    //     }
    // }

    // 0~51보다 작은 (0~50까지의 숫자를 생성)
    year = Math.floor(Math.random() * (2010 - 1960 + 1)) + 1960;

    return year;
}

function generateAddress() {
    // 앞에 1~100 까지의 번지수를 붙인 주소를 생성하시오.
    const street = getRandomInRange(1, 100);
    const city = cities[Math.floor(Math.random() * cities.length)]
    return `${street} ${city}`
}

const userdb = [];

for (let i = 0; i < 5; i++) {
    userdb.push([generateName(), generateGender(), generateBirthdate(), generateAddress()]);
}

// db에 있는 내용
// for (const user of userdb) {
//     console.log(user);
// }
// console.log(userdb);

// csv 형태로, 파일에 저장하시오...
// user.csv

const fs = require('fs');

function writeDataToCSV(data, filePath) {
    const header = ["Name", "Birthdate", "Gender", "Address"]
    const rows = data.map(row => {
        const row_string = row.join(",")
        console.log("데이터 row출력: ", row_string);
        return row_string;
    });
    console.log("rows통합: ", rows);
    const csvContent = [header, ...rows].join('\n');
    console.log("csv콘텐츠: ", csvContent);

    fs.writeFileSync(filePath, csvContent, 'utf8');
}

console.log("사용자데이터 출력: ", userdb);
writeDataToCSV(userdb, "user.csv");

// ------ 여기서부터틑 상점 -----------------------------------
class NameGenerator {

}

class User {

}

// ------ 여기서부터는 아이템 -----------------------------------
