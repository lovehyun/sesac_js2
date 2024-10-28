class NameGenerator {
    constructor() {
        this.names = ['John', 'Jane', 'Michael', 'Emily', 'William', 'Olivia'];
        this.lastname = ['박', '김', '이', '조', '최'];
        this.firstname = ['가', '나', '다', '라', '마'];
    }

    generateName() {
        return this.lastname[Math.floor(Math.random() * this.lastname.length)] + this.firstname[Math.floor(Math.random() * this.firstname.length)];
    }
}

class GenderGenerator {
    generateGender() {
        return Math.random() < 0.5 ? "남성" : "여성";
    }
}

class MyUtility {
    static getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

class BirthdateGenerator {
    generateBirthdate() {
        // YYYY-MM-DD 포멧으로 반환하기.
        // const year = Math.floor(Math.random() * (2010 - 1960 + 1)) + 1960;
        const year = MyUtility.getRandomInRange(1960, 2010);
        // const month = Math.floor(Math.random() * 12) + 1;
        const month = MyUtility.getRandomInRange(1, 12);
        // const day = Math.floor(Math.random() * 28) + 1;  // 1~28일까지가 나옴
        const day = MyUtility.getRandomInRange(1, 28);

        return `${year}-${month}-${day}`
    }
}

class AddressGenerator {
    constructor() {
        this.cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia']
    }
    generateAddress() {
        // 앞에 1~100 까지의 번지수를 붙인 주소를 생성하시오.
        const street = MyUtility.getRandomInRange(1, 100);
        const city = this.cities[Math.floor(Math.random() * this.cities.length)]
        return `${street} ${city}`
    }
}

class UserGenerator {
    constructor() {
        this.nameGen = new NameGenerator();
        this.birthGen = new BirthdateGenerator();
        this.genderGen = new GenderGenerator();
        this.addressGen = new AddressGenerator();
    }

    generateData(count) {
        const data = [];
        for (let i = 0; i < count; i++) {
            const name = this.nameGen.generateName();
            const birthdate = this.birthGen.generateBirthdate();
            const gender = this.genderGen.generateGender();
            const address = this.addressGen.generateAddress();
            data.push([name, birthdate, gender, address]);
        }
        return data;
    }
}

// class DataPrinter extends UserGenerator {
//     printData(count) {
//         const data = this.generateData(count);
//         for (const [name, birthdate, gender, address] of data) {
//             console.log(`이름: ${name}, 생년월일: ${birthdate}, 성별: ${gender}, 주소 ${address}`)
//         }
//     }
// }

// const dataPrinter = new DataPrinter();
// dataPrinter.printData(10);

class DataPrinter {
    constructor(data) {
        this.data = data; // 의존성.. 의존성 삽입
    }

    printConsole() {
        for (const [name, birthdate, gender, address] of this.data) {
            console.log(`이름: ${name}, 생년월일: ${birthdate}, 성별: ${gender}, 주소 ${address}`)
        }
    }

    printHTML() {
        console.log('HTML형태로 내보냈습니다.');
    }

    writeToCSV() {
        console.log('csv파일에 저장이 완료되었습니다');
    }
}

const userGenerator = new UserGenerator();
const users = userGenerator.generateData(10);

const dataPrinter = new DataPrinter(users)
dataPrinter.printConsole();
dataPrinter.printHTML();
dataPrinter.writeToCSV();
