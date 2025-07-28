//+ in the name of Cross
//# link problem: https://www.codewars.com/kata/525c7c5ab6aecef16e0001a5
function parseInt(string) {
  const result = [];
  const multiplies = [Math.pow(10, 2), Math.pow(10, 3), Math.pow(10, 6)];
  let chunk = 0;
  const stringSplit = string.split(" ");
  for (let word of stringSplit) {
    if (word == "and") continue;
    const number = returnNumberFrom(word);
    if (multiplies.includes(number)) {
      chunk = chunk == 0 ? 1 * number : chunk * number;
      if (number == 100) continue;
      result.push(chunk);
      chunk = 0;
      continue;
    }
    chunk += number;
  }
  result.push(chunk);
  return result.reduce((a, b) => a + b);
}
function returnNumberFrom(word) {
  const numbers = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    fourteen: 14,
    fifteen: 15,
    sixteen: 16,
    seventeen: 17,
    eighteen: 18,
    nineteen: 19,
    twenty: 20,
    thirty: 30,
    forty: 40,
    fifty: 50,
    sixty: 60,
    seventy: 70,
    eighty: 80,
    ninety: 90,
    hundred: 100,
    thousand: 1000,
    million: 1 * Math.pow(10, 6),
  };
  if (word.includes("-")) {
    const [first, second] = word.split("-");
    const number = numbers[first] + numbers[second];
    return number;
  }
  return numbers[word];
}
console.log(parseInt("one"));
console.log(
  parseInt("seven hundred eighty-three thousand nine hundred and nineteen")
);
console.log(parseInt("one million"));
