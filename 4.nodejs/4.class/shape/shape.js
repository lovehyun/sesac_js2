class Shape {
    constructor(type) {
        this.type = type;
    }

    getArea() {
        // 이 함수 구현을 필수화 하기 위해서... 다른 언어의 abstract class (추상클래스) 처럼 만들기. node.js 에서는 이 추상클래스가 없음..
        throw new Error('getArea() must be implemented by a subclass');
    }

    toString() {
        return `${this.type} - 넓이: ${this.getArea().toFixed(2)} m2`
    }
}

class Square extends Shape {
    constructor(sideLength) {
        super('Square');
        this.length = sideLength;
    }

    getArea() {
        return this.length ** 2; // ** 은 제곱.. this.length * this.length;
    }

    getInfo() {
        return `Square는 길이 ${this.length} 를 갖고 있습니다.`
    }
}

class Triangle extends Shape {
    constructor(base, height) {
        super('Triangle');
        this.base = base;
        this.height = height;
    }

    getArea() {
        return this.base * this.height * 0.5;
    }

    getInfo() {
        return `Triangle 은 밑변 ${this.base} 와 높이 ${this.height} 를 갖고 있습니다.`
    }
}

class Circle extends Shape {
    constructor(radius) {
        super('Circle');
        this.radius = radius;
    }

    getArea() {
        // const PI = 3.141592;

        return Math.PI * this.radius ** 2;
    }

    getInfo() {
        return `Circle은 반지름 ${this.radius} 를 갖고 있습니다.`
    }
}

class Trapezium extends Shape {
    constructor(base1, base2, height) {
        super('Trapezium');
        this.base1 = base1;
        this.base2 = base2;
        this.height = height;
    }

    getArea() {
        return (this.base1 + this.base2) * this.height * 0.5;
    }

    getInfo() {
        return `Trapezium 은 밑변/높이 ${this.base1}/${this.base2}, 높이 ${this.height} 를 갖고 있습니다.`
    }
}

// 사용 예시
const square = new Square(5);
const triangle = new Triangle(4, 3);
const trapezium = new Trapezium(4, 6, 5);
const circle = new Circle(3);

// console.log(square.getInfo(), 'Square Area:', square.getArea()); // 출력: 25
// console.log(triangle.getInfo(), 'Triangle Area:', triangle.getArea()); // 출력: 6
// console.log(trapezium.getInfo(), 'Circle Area:', circle.getArea()); // 출력: 28.27
// console.log(circle.getInfo(), 'Trapezium Area:', trapezium.getArea()); // 출력: 25

// console.log(square);
// console.log(triangle);
// console.log(trapezium);
// console.log(circle);

console.log(`${square}`);
console.log(`${triangle}`);
console.log(`${trapezium}`);
console.log(`${circle}`);
