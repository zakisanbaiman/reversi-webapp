const numbers = [10, 20, 30, 40, 50, 60, 70, 80, 90];
// console.log(numbers);

// numbers.forEach((num, i) => {
//   const doubled = num * 2;
//   console.log(`index: ${i}, num: ${num}, doubled: ${doubled}`);
// });

const names = ['Alice', 'Bob', 'Charlie'];
const users = names.map((name, i) => {
  return {
    id: i,
    name: name,
  };
});

// const evenIdUsers = users.filter((user) => {
//   return user.id % 2 === 0;
// });
// console.log(evenIdUsers);

// const oddIdUsers = users.filter((user) => user.id % 2 !== 0);
// console.log(oddIdUsers);

const sum = numbers.reduce((prev, current) => {
  return prev + current;
});
console.log(sum);