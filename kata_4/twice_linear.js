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
  for (let i = 0; i < n; i++) {
    u.addElement(y(u.getElementBy(i)));
    u.addElement(z(u.getElementBy(i)));
  }
  return u;
}
class Heap {
  constructor() {
    this.heap = [];
    this.tracked = new Set();
  }

  addElement(element) {
    this.heap.push(element);
    let checkIndexBiggerThanOne = true;
    do {
      let indexChild = this.heap.indexOf(element);
      let indexParent = this.getIndexParentBy(indexChild);
      checkIndexBiggerThanOne = indexParent > 0 ? true : false;
      if (this.heap[indexParent] > element) {
        this.swapParentAndChild(indexParent, indexChild);
      } else break;
    } while (checkIndexBiggerThanOne);
  }
  getIndexParentBy(indexChild) {
    return Math.floor((indexChild - 1) / 2);
  }
  swapParentAndChild(indexParent, indexChild) {
    let temp = this.heap[indexParent];
    this.heap[indexParent] = this.heap[indexChild];
    this.heap[indexChild] = temp;
  }
  getElementBy(index) {
    return this.heap[index];
  }
}
function y(x) {
  return 2 * x + 1;
}
function z(x) {
  return 3 * x + 1;
}
console.log(dblLinear(10), 22);
// console.log(dblLinear(20), 57);
// console.log(dblLinear(30), 91);
// console.log(dblLinear(50), 175);
// console.log(dblLinear(100), 447);
