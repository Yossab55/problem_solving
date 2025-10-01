//+ in the name of cross
//# link of the problem: https://www.codewars.com/kata/5659c6d896bc135c4c00021e/train/javascript
const priorityMaxQueue = {
  list: [],
  maxNumber: undefined,
  addItems: function addItems(items) {
    this.list.push(...items);
    this.sortArrayDownUp();
    return this;
  },
  addItem: function addItem(item) {
    this.list.push(item);
    this.sortArrayDownUp();
    return this;
  },
  sortArrayDownUp: function sortArrayDownUp() {
    let parentIndex = this.list.length - 1;
    while (parentIndex >= 0) {
      const maxIndex = this.maxOfChild(parentIndex);
      if (maxIndex == undefined) {
        parentIndex--;
        continue;
      }
      if (this.list[maxIndex] > this.list[parentIndex]) {
        const temp = this.list[parentIndex];
        this.list[parentIndex] = this.list[maxIndex];
        this.list[maxIndex] = temp;
      }
      parentIndex--;
    }
    return this;
  },
  maxOfChild: function maxOfChild(parentIndex) {
    const items = this.list;
    const leftChildIndex = parentIndex * 2 + 1;
    const rightChildIndex = parentIndex * 2 + 2;
    if (leftChildIndex >= items.length) return undefined;
    const leftChild = items[leftChildIndex];
    const rightChild = items[rightChildIndex];
    let maxIndex =
      leftChild > rightChild
        ? leftChildIndex
        : rightChild != undefined
        ? rightChildIndex
        : leftChildIndex;
    return maxIndex;
  },
  getAllItemsSorted: function getAllItemsSorted() {
    const result = [];
    const size = this.list.length;
    for (let i = 0; i < size; i++) {
      const lastElementIndex = this.list.length - 1;
      const temp = this.list[0];
      this.list[0] = this.list[lastElementIndex];
      this.list[lastElementIndex] = temp;
      const maxNumber = this.list.pop();
      result.push(maxNumber);
      this.sortArrayUpDown();
    }
    return result;
  },
  sortArrayUpDown: function sortArrayUpDown() {
    let parentIndex = 0;
    while (parentIndex < this.list.length) {
      const rightChildIndex = parentIndex * 2 + 1;
      const leftChildIndex = parentIndex * 2 + 2;
      const rightChild = this.list[rightChildIndex];
      const leftChild = this.list[leftChildIndex];
      let maxIndex =
        leftChild > rightChild
          ? leftChildIndex
          : rightChild != undefined
          ? rightChildIndex
          : leftChildIndex;
      if (this.list[maxIndex] > this.list[parentIndex]) {
        const temp = this.list[maxIndex];
        this.list[maxIndex] = this.list[parentIndex];
        this.list[parentIndex] = temp;
        parentIndex = maxIndex;
      } else break;
    }
  },
};
function nextSmaller(n) {
  let numberStringReverse = String(n).split("").reverse();
  //swap between small and next bigger number
  let didSwapped = false;
  let smallerNumberIndex = numberStringReverse.length;
  let biggerNumber = 0;
  for (let i = biggerNumber; i < smallerNumberIndex; i++) {
    for (let j = i + 1; j < smallerNumberIndex; j++) {
      if (numberStringReverse[i] < numberStringReverse[j]) {
        smallerNumberIndex = j;
        biggerNumber = i;
        didSwapped = true;
        break;
      }
    }
  }
  if (didSwapped) {
    const temp = numberStringReverse[biggerNumber];
    numberStringReverse[biggerNumber] = numberStringReverse[smallerNumberIndex];
    numberStringReverse[smallerNumberIndex] = temp;
  } else return -1;
  //after swapping make MAX heap sort!!
  const partToSwap = numberStringReverse.slice(0, smallerNumberIndex);
  const sortedPart = priorityMaxQueue
    .addItems(partToSwap)
    .getAllItemsSorted()
    .reverse();
  const result = sortedPart
    .concat(numberStringReverse.slice(smallerNumberIndex))
    .reverse()
    .join("");
  if (result[0] == "0") return -1;
  return Number(result);
}
console.log(nextSmaller(2071)); // 2017
console.log(nextSmaller(135)); // -1
console.log(nextSmaller(531)); // 513
console.log(nextSmaller(51226262651257)); //51226262627551
