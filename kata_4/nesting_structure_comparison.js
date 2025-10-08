//+ in the name of cross
//# link of the problem: https://www.codewars.com/kata/520446778469526ec0000001
Array.prototype.sameStructureAs = function (other) {
  if (!Array.isArray(other) || this.length !== other.length) return false;

  for (let i = 0; i < this.length; i++) {
    const a = this[i];
    const b = other[i];

    const aIsArray = Array.isArray(a);
    const bIsArray = Array.isArray(b);

    if (aIsArray !== bIsArray) return false;

    if (aIsArray && !a.sameStructureAs(b)) return false;
  }

  return true;
};
// should return true
console.log([1, 1, 1].sameStructureAs([2, 2, 2]));
console.log([1, [1, 1]].sameStructureAs([2, [2, 2]]));

// should return false
console.log([1, [1, 1]].sameStructureAs([[2, 2], 2]));
console.log([1, [1, 1]].sameStructureAs([[2], 2]));

// should return true
console.log([[[], []]].sameStructureAs([[[], []]]));

// should return false
console.log([[[], []]].sameStructureAs([[1, 1]]));

console.log([1, [1, 1]].sameStructureAs([2, [2]])); // false

console.log([].sameStructureAs(1)); // false

console.log([[[], []]].sameStructureAs([[1, 1]])); //false
