const v1: number = 1;
console.log(v1); // 1

let v2: number = 2;
// v2 = 'hello'; 
console.log(v2); // hello

// 型推論
let v3 = 3;
console.log(v3); // 3

// エラーになる
let v4 = 4;
// v4 = 'hello';
console.log(v4); // hello

let v5: number | string = 5;
v5 = 'hello';
console.log(v5); // hello

// 配列の場合は型を指定する必要がある
const arr1: number[] = [];
arr1.push(1);
console.log(arr1); // [1]

