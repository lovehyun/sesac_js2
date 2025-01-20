// Person 에 대한 인터페이스 정의 (데이터 속성과 타입)
interface Person2 {
    name: string;
    age: number;
    isEmployed: boolean;
}

const alice: Person2 = {
    name: "Alice",
    age: 30,
    isEmployed: true
};

console.log(`Name: ${alice.name}, age: ${alice.age}`);

interface Product {
    readonly id: number;       // 필수, 읽기 전용 (변경불가)
    name: string;     // 필수
    price?: number;   // 선택
}

const laptop: Product = {
    id: 1,
    name: 'Lenovo',
    // price는 아직 미정
}

console.log(`상품 ID: ${laptop.id}, name: ${laptop.name}, price: ${laptop.price}`)
laptop.name = 'Lenovo A5';
laptop.price = 1000;

console.log(`상품 ID: ${laptop.id}, name: ${laptop.name}, price: ${laptop.price}`)
// laptop.id = 2;
