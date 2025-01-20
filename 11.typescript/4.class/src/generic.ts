function identity<T>(value: T): T {
    return value;
}

console.log(identity<string>("Hello"));
console.log(identity<number>(42));

function wrapInArray<T>(value: T): T[] {
    return [value]
}

console.log(wrapInArray<number>(5));
console.log(wrapInArray<string>("Hello"));

// 리스트를 <아무타입이나> 인자로 받아서 해당타입의 요소 하나 반납
function getFirstElement<T>(array: T[]): T {
    return array[0];
}

console.log(getFirstElement<number>([1,2,3]));
console.log(getFirstElement([1,2,3]));

console.log(getFirstElement<string>(["alice","bob","charlie"]));
console.log(getFirstElement(["alice","bob","charlie"]));

// 리스트를 <아무타입이나> 인자로 받아서 해당타입의 요소 하나 또는 없음(undefined) 반납
function getLastElement<T>(array: T[]): T | undefined {
    if (array.length === 0) {
        return undefined;
    }
    return array[array.length - 1];
}

console.log(getLastElement<number>([1,2,3]));
console.log(getLastElement([1,2,3]));
console.log(getLastElement<number>([]));

function getMiddleElement<T>(array: T[]): T | undefined {
    if (array.length === 0) {
        return undefined;
    }
    const middleIndex = Math.floor(array.length / 2); // 중간 인덱스를 가져와서 내림처리
    return array[middleIndex];
}

console.log(getMiddleElement([1,2,3])); // 3 / 2 = 1.5 = 1
console.log(getMiddleElement([1,2,3,4])); // 4 / 2 = 2
console.log(getMiddleElement([1,2,3,4,5])); // 5 / 2 = 2.5 = 2
console.log(getMiddleElement<number>([]));

const middle: number | undefined = getMiddleElement([1,2,3]);
const middle2: number = getMiddleElement([1,2,3]) ?? -1; // 앞에 값이 없으면?? 뒤에 -1 이 기본값..


