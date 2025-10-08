// In the name of Cross
//# code wars problem: https://www.codewars.com/kata/5672682212c8ecf83e000050
function dblLinear(n) {
  const u = new Heap();
  u.addElement(1);
  for (let i = 0; i < n; i++) {
    const small = u.extractElement();
    u.addElement(y(small));
    u.addElement(z(small));
  }
  return u.getFirstElement();
}
class Heap {
  constructor() {
    this.heap = [];
    this.tracked = new Set();
  }
  addElement(number) {
    if (this.tracked.has(number)) return;
    this.tracked.add(number);
    this.heap.push(number);
    this.#sortAfterAdding();
  }
  #sortAfterAdding() {
    let tempHeap = this.heap;
    for (let i = tempHeap.length - 1; i >= 0; i--) {
      const parentIndex = this.#parentIndexFromChild(i);
      let parent = tempHeap[parentIndex];
      if (parent > tempHeap[i]) {
        const tempElement = parent;
        tempHeap[parentIndex] = tempHeap[i];
        tempHeap[i] = tempElement;
        i = parentIndex + 1;
      } else break;
    }
  }
  #parentIndexFromChild(index) {
    return Math.floor((index - 1) / 2);
  }
  extractElement() {
    let smallestItem = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap[this.heap.length - 1] = smallestItem;
    this.heap.pop();
    this.#sortAfterDeletion(0);
    return smallestItem;
  }
  #sortAfterDeletion(index) {
    while (true) {
      const leftChild = this.#leftChildOfParent(index);
      const rightChild = this.#rightChildOfParent(index);
      let smallest = index;

      if (
        leftChild < this.heap.length &&
        this.heap[leftChild] < this.heap[smallest]
      ) {
        smallest = leftChild;
      }
      if (
        rightChild < this.heap.length &&
        this.heap[rightChild] < this.heap[smallest]
      ) {
        smallest = rightChild;
      }
      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }
  #rightChildOfParent(index) {
    return index * 2 + 1;
  }
  #leftChildOfParent(index) {
    return index * 2 + 2;
  }
  getFirstElement() {
    return this.heap[0];
  }
}
function y(x) {
  return 2 * x + 1;
}
function z(x) {
  return 3 * x + 1;
}
console.log(dblLinear(10), 22);
console.log(dblLinear(20), 57);
console.log(dblLinear(30), 91);
console.log(dblLinear(50), 175);
console.log(dblLinear(100), 447);
// deep seek solution
// function dblLinear(n) {
//   const u = [1];
//   let i = 0,
//     j = 0;

//   while (u.length <= n) {
//     const nextY = 2 * u[i] + 1;
//     const nextZ = 3 * u[j] + 1;
//     const next = Math.min(nextY, nextZ);
//     u.push(next);

//     if (next === nextY) i++;
//     if (next === nextZ) j++;
//   }

//   return u[n];
// }
