//+ In the Name of Cross
function longestSlideDown(pyramid) {
  // if (pyramid.length == 0) return 0;
  // if (pyramid.length == 1) return pyramid[0][0];
  // let previousGridSum = [];
  // while (pyramid.length) {
  //   const row = previousGridSum.length ? previousGridSum : pyramid.shift();
  //   const column = pyramid.shift();
  //   let result = [];
  //   for (let rowIndex = 0; rowIndex < row.length; rowIndex++) {
  //     const rowItem = row[rowIndex];
  //     let counter = 0;
  //     for (
  //       let columnIndex = rowIndex;
  //       counter < 2 && columnIndex < column.length;
  //       columnIndex++
  //     ) {
  //       counter++;
  //       const columnItem = column[columnIndex];
  //       const sum = rowItem + columnItem;
  //       const itemInCurrentResult = previousGridSum[columnIndex];
  //       if (!itemInCurrentResult || itemInCurrentResult <= sum) {
  //         result[columnIndex] = sum;
  //       } else result[columnIndex] = itemInCurrentResult;
  //     }
  //     previousGridSum = result;
  //   }
  // }
  // return Math.max(...previousGridSum);
  let dp = pyramid.map((row) => [...row]);

  for (let i = pyramid.length - 2; i >= 0; i--) {
    for (let j = 0; j < dp[i].length; i++) {
      dp[i][j] += Math.max(dp[i + 1][j], dp[i + 1][j + 1]);
    }
  }
  return dp[0][0];
}

console.log(longestSlideDown([[3], [7, 4], [2, 4, 6], [8, 5, 9, 3]]));
console.log(
  longestSlideDown([
    [75],
    [95, 64],
    [17, 47, 82],
    [18, 35, 87, 10],
    [20, 4, 82, 47, 65],
    [19, 1, 23, 75, 3, 34],
    [88, 2, 77, 73, 7, 63, 67],
    [99, 65, 4, 28, 6, 16, 70, 92],
    [41, 41, 26, 56, 83, 40, 80, 70, 33],
    [41, 48, 72, 33, 47, 32, 37, 16, 94, 29],
    [53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14],
    [70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57],
    [91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48],
    [63, 66, 4, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31],
    [4, 62, 98, 27, 23, 9, 70, 98, 73, 93, 38, 53, 60, 4, 23],
  ])
);
console.log(longestSlideDown([[75]]));
