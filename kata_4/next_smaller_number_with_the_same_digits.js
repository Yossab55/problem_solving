//+ in the name of cross
//# link of the problem: https://www.codewars.com/kata/5659c6d896bc135c4c00021e/train/javascript
function nextSmaller(n) {
  return 0;
}

//todo priority queue
const priorityQueue = {
  list: [],
  addItems: function addItems(items) {
    this.list.push(...items);
    this.sortArray();
    return this;
  },
  addItem: function addItem(item) {
    this.list.push(item);
    this.sortArray();
    return this;
  },
  sortArray: function sortArray() {
    let parentIndex = this.list.length - 1;
    while (parentIndex >= 0) {
      const minIndex = this.minOfChild(parentIndex);
      if (minIndex == undefined) {
        parentIndex--;
        continue;
      }
      if (this.list[minIndex] < this.list[parentIndex]) {
        const temp = this.list[parentIndex];
        this.list[parentIndex] = this.list[minIndex];
        this.list[minIndex] = temp;
      }
      parentIndex--;
    }
    return this;
  },
  minOfChild: function minOfChild(parentIndex) {
    const items = this.list;
    const leftChildIndex = parentIndex * 2 + 1;
    const rightChildIndex = parentIndex * 2 + 2;
    if (leftChildIndex >= items.length) return undefined;
    const leftChild = items[leftChildIndex];
    const rightChild = items[rightChildIndex];
    let minIndex =
      leftChild < rightChild
        ? leftChildIndex
        : rightChild != undefined
        ? rightChildIndex
        : leftChildIndex;
    return minIndex;
  },
  removeSmallestItem: function removeSmallestItem() {},
};

console.log(priorityQueue.addItems([2, 3, 4, 1]).list);
