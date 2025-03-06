// function sumIntervals(intervals) {
//   for (let i = 0; i < intervals.length; i++) {
//     let bigNumber = intervals[i][1];
//     for (let j = 0; j < intervals.length; j++) {
//       let checkedInterval = intervals[j];
//       if (checkBetween(bigNumber, checkedInterval) && j != i) {
//         intervals[i][1] = checkedInterval[1];
//         intervals = deleteBetweenInterval(
//           intervals,
//           whoToDelete(intervals, i, j)
//         );
//         i--;
//         break;
//       }
//     }
//   }
//   return getLength(intervals);
// }
// function checkBetween(number, interval) {
//   if (number > interval[0] && number <= interval[1]) return true;
//   return false;
// }
// function deleteBetweenInterval(array, index) {
//   return array.slice(0, index).concat(array.slice(index + 1));
// }
// function whoToDelete(array, i, j) {
//   let lengthOfI = array[i][1] - array[i][0];
//   let lengthOfJ = array[j][1] - array[j][0];
//   return lengthOfI >= lengthOfJ ? j : i;
// }
// function getLength(intervals) {
//   let length = 0;
//   for (let i = 0; i < intervals.length; i++) {
//     length += intervals[i][1] - intervals[i][0];
//   }
//   return length;
// }
console.log(
  sumIntervals([
    [1, 4],
    [7, 10],
    [3, 5],
  ])
);
console.log(
  sumIntervals([
    [1, 5],
    [10, 20],
    [1, 6],
    [16, 19],
    [5, 11],
  ])
);
function sumIntervals(intervals) {
  if (intervals.length == 1) return intervals[0][1] - intervals[0][0];
  if (intervals.length == 0) return 0;
  // intervals = quickSortOfNested(intervals);
  intervals.sort((a, b) => a[0] - b[0]);
  return getLengthsOf(intervals);
}
// call stack error :(
function quickSortOfNested(array) {
  if (array.length <= 1) return array;
  let middleIndex = parseInt(array.length / 2);
  let middleItem = array[middleIndex];
  let small = [];
  let big = [];
  for (let i = 0; i < array.length; i++) {
    if (i == middleIndex) continue;

    if (array[i][0] < middleItem[0]) {
      small.push(array[i]);
      continue;
    }
    if (array[i][1] > middleItem[1]) {
      big.push(array[i]);
      continue;
    }
    if (array[i][1] < middleItem[1]) {
      small.push(array[i]);
    }
  }
  return quickSortOfNested(small)
    .concat([middleItem])
    .concat(quickSortOfNested(big));
}

function getLengthsOf(intervals) {
  if (intervals.length == 1) return intervals[0][1] - intervals[0][0];
  if (intervals.length == 0) return 0;
  let first = intervals.shift();
  let second = intervals.shift();
  if (first[1] > second[0]) {
    let small = Math.min(first[0], first[0]);
    let big = Math.max(first[1], second[1]);
    let mergedIntervals = [small, big];
    intervals.unshift(mergedIntervals);
    return getLengthsOf(intervals);
  } else {
    intervals.unshift(second);
  }
  let lengthOfFirst = first[1] - first[0];
  return lengthOfFirst + getLengthsOf(intervals);
}
