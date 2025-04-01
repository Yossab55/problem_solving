class RomanNumerals {
  static romanToNumber = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  static numberToRoman = {
    1000: "M",
    500: "D",
    100: "C",
    50: "L",
    10: "X",
    5: "V",
    1: "I",
  };
  static uniqueNumberToRoman = {
    900: "CM",
    400: "CD",
    90: "XC",
    40: "XL",
    9: "IX",
    4: "IV",
  };
  static toRoman(num) {
    return String(num)
      .split("")
      .reverse()
      .map((element, index) => Number(element) * 10 ** index)
      .map((e) => {
        if (RomanNumerals.numberToRoman[e])
          return [RomanNumerals.numberToRoman[e]];
        if (RomanNumerals.uniqueNumberToRoman[e])
          return [RomanNumerals.uniqueNumberToRoman[e]];
        const values = Object.keys(RomanNumerals.numberToRoman)
          .map((e) => Number(e))
          .sort((a, b) => b - a);
        const result = [];
        for (const value of values) {
          if (e >= value) {
            let numberOfAppearance = Math.floor(e / value);
            let reminder = e % value;
            e = reminder;
            result.push(
              RomanNumerals.numberToRoman[value].repeat(numberOfAppearance)
            );
          }
        }
        return result;
      })
      .map((e) => e.join(""))
      .reverse()
      .join("");
  }

  static fromRoman(str) {
    let result = 0;
    for (let i = 0; i < str.length; i++) {
      console.log(i)
      const twoChars = str.slice(i, i + 2);
      if (RomanNumerals.romanToNumber[twoChars]) {
        result += RomanNumerals.romanToNumber[twoChars];
        i ++;
        continue;
      }
      result += RomanNumerals.romanToNumber[str[i]];
    }
    return result;
  }
}

console.log(RomanNumerals.toRoman(2008));
console.log(RomanNumerals.toRoman(986));
console.log(RomanNumerals.fromRoman("MMVIII"));
console.log(RomanNumerals.fromRoman("CMLXXXVI"));
