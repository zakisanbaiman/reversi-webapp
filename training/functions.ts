function mul1(v1: number, v2: number): number {
    return v1 * v2;
}

// const result1 = mul1(1, 2);
// console.log(result1); // 2

// 戻り値の型を省略すると型推論が行われる
function mul2(v1: number, v2: number) {
    return v1 * v2;
}

const result2 = mul2(10, 20);
console.log(result2); // 2

function mul3(v1: any, v2: any): any {
    return v1 * v2;
}
const result3_1 = mul3(100, 200);
console.log(result3_1); // 2
const result3_2 = mul3('hello', 2);
console.log(result3_2); // hellohello