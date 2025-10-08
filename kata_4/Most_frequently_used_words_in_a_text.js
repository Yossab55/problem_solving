//+ in the name of cross
//# link of problem: https://www.codewars.com/kata/51e056fe544cf36c410000fb
function topThreeWords(text) {
  const regex = /[a-z']*[a-z][a-z']*/g;
  const words = text.toLowerCase().match(regex);
  if (!words) return [];
  const freq = {};
  for (const word of words) {
    freq[word] = (freq[word] || 0) + 1;
  }
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map((ele) => ele[0]);
}
console.log(
  topThreeWords(`In a village of La Mancha, the name of which I have no desire to call to
mind, there lived not long since one of those gentlemen that keep a lance
in the lance-rack, an old buckler, a lean hack, and a greyhound for
coursing. An olla of rather more beef than mutton, a salad on most
nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra
on Sundays, made away with three-quarters of his income.`)
); //["a", "of", "on"]
console.log(topThreeWords("  //wont won't won't '")); //["won't", "wont"]
console.log(
  topThreeWords("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e")
); //["e", "ddd", "aa"]
console.log(topThreeWords("  '  ")); //["e", "ddd", "aa"]
console.log(
  topThreeWords("A frog spoke of a rat to a cat among the CD with the frog ")
);
console.log(topThreeWords("A cat bolted at the CD into the monster "));
