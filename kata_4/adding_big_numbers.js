//# code wars link: https://www.codewars.com/kata/525f4206b73515bffb000b21
function add(a, b) {
  let [small, big] = a.length < b.length ? [a, b] : [b, a];
  small = small.padStart(big.length, "0");
  big = big.split("").reverse();
  small = small.split("").reverse();
  let result = [];
  let carry = 0;
  let size = small.length;
  for (let i = 0; i < size; i++) {
    let smallNumber = Number(small[i]);
    let bigNumber = Number(big[i]);
    let sum = smallNumber + bigNumber + carry;
    carry = 0;
    if (sum >= 10) {
      carry = 1;
      sum -= 10;
      result.push(sum.toString());
    } else result.push(sum.toString());
  }
  if (carry) result.push(carry.toString());
  return result.reverse().join("");
}
console.log(add("1372", "69"));
console.log("1441");
console.log(add("63829983432984289347293874", "90938498237058927340892374089"));
console.log("91002328220491911630239667963");
