const util = require("util");
let sum = 0;
let savedFirstSum;
let isSaved = false;
let isFirst = true;
function add(n) {
  if (n) {
    sum += n;
  }
  return add;
}
add[util.inspect.custom] = showSum;

function showSum() {
  if (isFirst && !isSaved) {
    isFirst = false;
    isSaved = true;
    savedFirstSum = sum;
  }
  const result = sum;
  sum = 0;
  if (result == 0) return `${savedFirstSum}`;
  return `${result}`;
}

let a = add(1)(2);
console.log(a); // 3
console.log(a(7)); // 10
console.log(a(7)(3)); // 13
console.log(a); // 3
console.log(a); //3
console.log(add(1)); // 1
console.log(add(1)(2)); // 3
console.log(add(1)(2)(3)); // 6
console.log(add); //0
