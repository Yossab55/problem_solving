//+ in the name of Cross
//# problem link on code wars: https://www.codewars.com/kata/52c4dd683bfd3b434c000292
function isInteresting(number, awesomePhrases) {
  if (number < 98) return 0;
  if (number < 100) {
    if (
      validationOn(number + 1, awesomePhrases) ||
      validationOn(number + 2, awesomePhrases)
    )
      return 1;
    return 0;
  }

  if (validationOn(number, awesomePhrases)) return 2;
  if (
    validationOn(number + 1, awesomePhrases) ||
    validationOn(number + 2, awesomePhrases)
  )
    return 1;

  return 0;
}
function validationOn(number, awesomePhrases) {
  if (awesomePhrases.includes(number)) return true;

  const validators = [
    isDigitFollowedByAllZeros,
    isEveryDigitIsTheSame,
    isDigitsAreSequentialIncrementing,
    isDigitsAreSequentialDecrementing,
    isDigitsPalindrome,
  ];
  for (const validator of validators) {
    if (validator(number)) return true;
  }
  return false;
}
function isEqual(number, awesomeNumber) {
  if (number == awesomeNumber) return true;
  return false;
}
function isNear(number, awesomeNumber) {
  if (number + 1 == awesomeNumber) return true;
  if (number + 2 == awesomeNumber) return true;
  return false;
}
function isDigitFollowedByAllZeros(number) {
  const regex = /^[1-9]0+$/g;

  if (regex.test(String(number))) return true;
  return false;
}
function isEveryDigitIsTheSame(number) {
  const stringNumber = String(number).split("");
  const firstDigit = stringNumber[0];
  return stringNumber.every((digit) => digit == firstDigit);
}
function isDigitsAreSequentialIncrementing(number) {
  const numberSplit = String(number).split("");
  const length = numberSplit.length - 1;
  for (let i = 0; i < length; i++) {
    const secondNumber = numberSplit[i + 1];
    const firstNumber = numberSplit[i];
    if (firstNumber == 9 && secondNumber == 0) continue;
    if (firstNumber == 0 && secondNumber == 1) return false;
    if (firstNumber != secondNumber - 1) return false;
  }
  return true;
}
function isDigitsAreSequentialDecrementing(number) {
  const numberSplit = String(number).split("");
  const length = numberSplit.length - 1;
  for (let i = 0; i < length; i++) {
    const secondNumber = numberSplit[i + 1];
    const firstNumber = numberSplit[i];
    if (firstNumber == 1 && secondNumber == 0) continue;
    if (firstNumber == 0 && secondNumber == 9) return false;
    if (firstNumber - 1 != secondNumber) return false;
  }
  return true;
}
function isDigitsPalindrome(number) {
  const stringNumber = String(number).split("");
  const halfLength = stringNumber.length / 2;
  for (let i = 0; i < halfLength; i++) {
    const digit = stringNumber[i];
    const mirrorDigit = stringNumber[stringNumber.length - 1 - i];
    if (digit != mirrorDigit) return false;
  }
  return true;
}
console.log(isInteresting(98, [])); // 1
console.log(isInteresting(99, [])); // 1
// "boring" numbers
console.log(isInteresting(3, [1337, 256])); // 0
console.log(isInteresting(3236, [1337, 256])); // 0

// progress as we near an "interesting" number
console.log(isInteresting(11207, [])); // 0
console.log(isInteresting(11208, [])); // 0
console.log(isInteresting(11209, [])); // 1
console.log(isInteresting(11210, [])); // 1
console.log(isInteresting(11211, [])); // 2

// nearing a provided "awesome phrase"
console.log(isInteresting(1335, [1337, 256])); // 1
console.log(isInteresting(1336, [1337, 256])); // 1
console.log(isInteresting(1337, [1337, 256])); // 2
