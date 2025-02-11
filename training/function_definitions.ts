// 以下は関数の3つの定義方法を示しています。

// 関数宣言
function add1(v1: number, v2: number): number {
    return v1 + v2;
}

const result1 = add1(1, 2);
console.log(`result1: ${result1}`); // 3

// 関数式
const add2 = function(v1: number, v2: number): number {
    return v1 + v2;
}
console.log(`result2: ${add2(1, 2)}`); // 3

// アロー関数
const add3 = (v1: number, v2: number): number => {
    return v1 + v2;
}
console.log(`result3: ${add3(1, 2)}`); // 3