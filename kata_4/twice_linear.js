//# code wars problem: https://www.codewars.com/kata/5672682212c8ecf83e000050
/**
 * ! issues you have 
 * Correct the Heap Implementation:


* * Ensure that addElement properly maintains the min-heap property by recursively checking and fixing the heap after each insertion (heapify-up).

* ? Add a method to extract the smallest element from the heap (heapify-down), which is crucial for generating the sequence in order.

// !heapify-down maybe is the best 
Fix the Sequence Generation Logic:

Use the heap to always process the smallest unprocessed element. This means:

Extract the smallest element from the heap.

Generate y and z from this element.

Add y and z to the heap if they haven't been added before (use a Set to track seen elements).

Repeat this process until you've processed n + 1 elements (since the sequence is 0-indexed).

Add Deduplication:

Maintain a Set to track which numbers have already been added to the heap to avoid duplicates.

Return the Correct Value:

After processing n + 1 elements, the n-th element will be the last one extracted from the heap. Return this value.
 */
function dblLinear(n) {
  const u = new Heap();
  u.addElement(1);
  for (let i = 0; i < n; i += 2) {
    const small = u.extractElement();
    u.addElement(y(small));
    u.addElement(z(small));
  }
  return u;
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
    //Todo sort the array!
  }
  extractElement() {
    let smallestItem = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap[this.heap.length - 1] = smallestItem;
    this.heap.pop();
    this.#sortTheHeap();
    return smallestItem;
  }
  #sortTheHeap() {
    let parentIndex = 0;
    do {
      let parent = this.heap[parentIndex];
      const rightChild = this.rightChildOfParent(parentIndex);
      const leftChild = this.leftChildOfParent(parentIndex);

      if (parent <= this.heap[rightChild] && parent <= this.heap[leftChild])
        return;

      let indexToSwap;
      if (this.heap[rightChild] < this.heap[leftChild])
        indexToSwap = rightChild;
      else if (this.heap[rightChild] > this.heap[leftChild])
        indexToSwap = leftChild;
      else if (this.heap[rightChild]) indexToSwap = rightChild;
      else if (this.heap[leftChild]) indexToSwap = leftChild;

      if (indexToSwap) {
        let temp = parent;
        this.heap[parentIndex] = this.heap[indexToSwap];
        this.heap[indexToSwap] = temp;
      }
      parentIndex = indexToSwap;
    } while (parentIndex != undefined || parentIndex < this.heap.length);
  }
  rightChildOfParent(index) {
    return index * 2 + 1;
  }
  leftChildOfParent(index) {
    return index * 2 + 2;
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
// console.log(dblLinear(30), 91);
// console.log(dblLinear(50), 175);
// console.log(dblLinear(100), 447);
