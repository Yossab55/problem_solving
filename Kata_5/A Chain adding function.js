function add(number) {
  function adder(next) {
    return add(number + next);
  }
  adder.valueOf = function () {
    return number;
  };
  adder.toString = function () {
    return `${number}`;
  };
  return adder;
}

//todo how to save in a
let a = add(1)(2);
console.log(String(a)); // 3
console.log(String(a(7))); // 10
console.log(String(a(7)(3))); // 13
console.log(String(a)); // 3
console.log(String(a)); //3
console.log(String(add(1))); // 1
console.log(String(add(1)(2))); // 3
console.log(String(add(1)(2)(3))); // 6
