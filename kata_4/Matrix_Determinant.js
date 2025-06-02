//# in the name of cross
function determinant(m) {
  if (m.length == 0) return 0;
  if (m.length == 1) return m[0][0];
  let sizeOfRow = m[0].length;
  let det = 0;
  for (let i = 0; i < sizeOfRow; i++) {
    const number = m[0][i];
    const sign = Math.pow(-1, i);
    const minor = getMinorFrom(m, i);
    det += sign * number * determinant(minor);
  }
  return det;
}
function getMinorFrom(matrix, columnToCancel) {
  return matrix
    .slice(1)
    .map((row) =>
      row.filter((_, columnIndex) => columnIndex != columnToCancel)
    );
}
let matrix = [
  [1, 2],
  [3, 4],
];
console.log(determinant(matrix));
matrix = [
  [1, 2, 3],
  [3, 4, 5],
  [6, 9, 10],
];
console.log(determinant(matrix));
matrix = [
  [1, 2, 3, 4],
  [3, 4, 5, 6],
  [6, 9, 10, 20],
  [20, 30, 50, 100],
];
console.log(determinant(matrix));
