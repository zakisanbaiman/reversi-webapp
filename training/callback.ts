function add(v1: number, v2: number): number {
  return v1 + v2;
}

function multiply(v1: number, v2: number): number {
  return v1 * v2;
}

function calclate(
  v1: number, 
  v2: number, 
  callback: (v1: number, v2: number) => number
): number {
  return callback(1, 2);
}

// const result = calclate(1, 2, add);
// console.log(`result: ${result}`); // 3

// const result = calclate(1, 2, multiply);
// console.log(`result: ${result}`); // 2

// function hello() {
//   console.log('Hello');
// }

// const hello = () => {
//   console.log('Hello');
// }

setTimeout(() => {
  console.log('Hello');
}, 3000); // 3秒後にHelloと表示される