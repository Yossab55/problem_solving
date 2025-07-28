//+ In the name of cross
//# problem link: https://www.codewars.com/kata/54d496788776e49e6b00052f/train/javascript
//todo negative numbers
function sumOfDivided(list) {
  const map = new Map();
  for (let i = 0; i < list.length; i++) {
    const bigNumber = list[i];
    const primesSetOfFactors = Array.from(getPrimeFactorsOf(bigNumber));
    primesSetOfFactors.forEach((primeNumber) => {
      if (map.has(primeNumber)) {
        map.get(primeNumber).push(bigNumber);
      } else {
        map.set(primeNumber, [bigNumber]);
      }
    });
  }
  return getResultFrom(map);
}
function getPrimeFactorsOf(number) {
  number = Math.abs(number);
  const factors = new Set();
  for (let i = 2; i * i < number; i++) {
    while (number % i === 0) {
      factors.add(i);
      number /= i;
    }
  }
  if (number > 1) factors.add(number);
  return factors;
}
function getResultFrom(map) {
  const result = [];
  map.forEach((value, key) => {
    let sum = value.reduce((previous, current) => {
      return previous + current;
    }, 0);
    result.push([key, sum]);
  });
  return result.sort((a, b) => a[0] - b[0]);
}

console.log(sumOfDivided([12, 15]));
console.log(sumOfDivided([15, 21, 24, 30, 45]));
console.log(sumOfDivided([15, 21, 24, 30, -45]));
console.log(sumOfDivided([107, 158, 204, 100, 118, 123, 126, 110, 116, 100]));
