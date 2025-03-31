// # codewars link: https://www.codewars.com/kata/5629db57620258aa9d000014
// # git hub link: https://github.com/Yossab55/problem_solving/blob/main/kata_4/string_mix.js
function mix(s1, s2) {
  s1 = countChars(s1);
  s2 = countChars(s2);
  let stringResults = createStrings(s1, s2);
  stringResults.sort(sortByLengthThenByOrder);
  return stringResults.join("/");
}
//# count chars functions
function countChars(string) {
  let result = {};
  for (let i = 0; i < string.length; i++) {
    let char = string[i];
    if (isAlpha(char)) {
      if (result[char] == undefined) result[char] = 1;
      else result[char]++;
    }
  }
  result = filterChar(result);
  return result;
}
function isAlpha(char) {
  if (
    (char.charCodeAt() >= 65 && char.charCodeAt() <= 90) ||
    (char.charCodeAt() >= 97 && char.charCodeAt() <= 122)
  )
    return true;
  return false;
}
function filterChar(chars) {
  let result = {};
  let keys = Object.keys(chars);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (chars[key] > 1) result[key] = chars[key];
  }
  return result;
}

//# make strings result functions
function createStrings(countChar1, countChar2) {
  let result = [];
  const [smaller, bigger] =
    countChar1.length > countChar2.length
      ? [countChar2, countChar1]
      : [countChar1, countChar2];
  console.log(countChar2);

  for (let [char, countAppearanceOfSmall] of Object.entries(smaller)) {
    if (bigger[char] == undefined) {
      result.push(createString("1", char, countAppearanceOfSmall));
      smaller[char] = undefined;
      continue;
    }
    if (bigger[char] > countAppearanceOfSmall) {
      result.push(createString("2", char, bigger[char]));
      smaller[char] = undefined;
      bigger[char] = undefined;
    } else if (bigger[char] < countAppearanceOfSmall) {
      result.push(createString("1", char, countAppearanceOfSmall));
      smaller[char] = undefined;
      bigger[char] = undefined;
    } else {
      result.push(createString("=", char, countAppearanceOfSmall));
      smaller[char] = undefined;
      bigger[char] = undefined;
    }
  }
  for (let [char, countAppearanceOfBig] of Object.entries(bigger)) {
    if (countAppearanceOfBig == undefined) continue;
    else {
      result.push(createString("2", char, countAppearanceOfBig));
    }
  }
  return result;
}
function createString(order, char, counter) {
  let result = order + ":";
  for (let i = 0; i < counter; i++) {
    result += char;
  }
  return result;
}

//# sort function
function sortByLengthThenByOrder(first, second) {
  if (first.length == second.length) return first > second ? 1 : -1;
  return second.length - first.length;
}
let s1 = "my&friend&Paul has heavy hats! &";
let s2 = "my friend John has many many friends &";
console.log(mix(s1, s2));

s1 = "mmmmm m nnnnn y&friend&Paul has heavy hats! &";
s2 = "my frie n d Joh n has ma n y ma n y frie n ds n&";
console.log(mix(s1, s2)); // "1:mmmmmm/=:nnnnnn/1:aaaa/1:hhh/2:yyy/2:dd/2:ff/2:ii/2:rr/=:ee/=:ss"


// #clever solve on code wars 

// const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
// function mix(s1, s2) {
//   return alphabet
//     .map((char) => {
//       const s1Count = s1.split("").filter((x) => x === char).length,
//         s2Count = s2.split("").filter((x) => x === char).length,
//         maxCount = Math.max(s1Count, s2Count);

//       return {
//         char: char,
//         count: maxCount,
//         src: maxCount > s1Count ? "2" : maxCount > s2Count ? "1" : "=",
//       };
//     })
//     .filter((c) => c.count > 1)
//     .sort(
//       (objA, objB) =>
//         objB.count - objA.count ||
//         (objA.src + objA.char > objB.src + objB.char ? 1 : -1)
//     )
//     .map((c) => `${c.src}:${c.char.repeat(c.count)}`)
//     .join("/");
// }

//# refactor by grok ai 
function mix(s1, s2) {
  const count1 = countLetters(s1);
  const count2 = countLetters(s2);
  const result = [];

  // Get all unique letters from both counts
  const allLetters = [
    ...new Set([...Object.keys(count1), ...Object.keys(count2)]),
  ];

  // Process each letter
  for (const letter of allLetters) {
    const freq1 = count1[letter] || 0;
    const freq2 = count2[letter] || 0;
    const maxFreq = Math.max(freq1, freq2);

    if (maxFreq <= 1) continue;

    const prefix = freq1 === freq2 ? "=" : freq1 > freq2 ? "1" : "2";
    result.push(`${prefix}:${letter.repeat(maxFreq)}`);
  }

  // Sort by length (descending) and then lexicographically
  return result
    .sort((a, b) => b.length - a.length || a.localeCompare(b))
    .join("/");
}

function countLetters(str) {
  const counts = {};
  for (const char of str) {
    if (/[a-z]/.test(char)) {
      counts[char] = (counts[char] || 0) + 1;
    }
  }
  // Filter out counts <= 1
  for (const char in counts) {
    if (counts[char] <= 1) delete counts[char];
  }
  return counts;
}