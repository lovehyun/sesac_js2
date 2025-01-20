class Animal {
    constructor (public readonly name: string) {}  // 위에 선언 안하고 this.name = name 안해도 자동

    makeSound() {
        console.log(`${this.name}: 동물소리. 멍멍/냐옹냐옹`);
    }
}

class Dog extends Animal {
    constructor(name: string, public readonly breed: string) {
        super(name);
    }

    override makeSound() {
        console.log(`${this.name} 멍멍`)
    }
}

const dog = new Dog('새싹', '골든리트리버');
console.log(`이름: ${dog.name}, 품종: ${dog.breed}`)
// dog.name = "새싹이"
dog.makeSound();

