function sumIntervals(intervals) {
  for (let i = 0; i < intervals.length; i++) {
    let bigNumber = intervals[i][1];
    for (let j = 0; j < intervals.length; j++) {
      let checkedInterval = intervals[j];
      if (
        bigNumber > checkedInterval[0] &&
        bigNumber <= checkedInterval[1] &&
        j != i
      ) {
        intervals[i][1] = checkedInterval[1];
        intervals = deleteBetweenInterval(intervals, whoToDelete(intervals, i , j));
        i--;
        break;
      }
    }
  }
  let length = 0;
  console.log(intervals)
  for(let i = 0; i < intervals.length; i++) {
    length += intervals[i][1] - intervals[i][0];
  }
  return length;
}
function deleteBetweenInterval(array, index) {
  return array.slice(0, index).concat(array.slice(index + 1));
}
function whoToDelete(array, i, j) {
  let lengthOfI = array[i][1] - array[i][0];
  let lengthOfJ = array[j][1] - array[j][0];
  return (lengthOfI >= lengthOfJ) ? j : i;
}
console.log(
  sumIntervals([
    [1, 4],
    [7, 10],
    [3, 5],
  ])
);
console.log(sumIntervals([[1, 5], [10, 20], [1, 6], [16, 19], [5, 11]]));