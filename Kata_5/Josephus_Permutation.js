//+ in the name of cross
//# link of the problem: https://www.codewars.com/kata/5550d638a99ddb113e0000a2/train/javascript

function josephus(items, k) {
  if (items.length == 0) return [];
  if (k == 1) return items;
  const result = [];
  let counter = 0;
  for (let i = 1; i <= items.length; i++) {
    counter++;
    if (counter == k) {
      counter = 0;
      result.push(items[i - 1]);
      items = items.slice(0, i - 1).concat(items.slice(i));
      i--;
    }
    if (i == items.length && items.length) {
      i = 0;
    }
  }
  return result;
}

// Tests
console.log(
  josephus([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1),
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);
console.log(
  josephus([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2),
  [2, 4, 6, 8, 10, 3, 7, 1, 9, 5]
);

console.log(josephus([1, 2, 3, 4, 5, 6, 7], 3), [3, 6, 2, 7, 5, 1, 4]);
