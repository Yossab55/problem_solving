// In the name of Cross
// link of the problem: https://www.codewars.com/kata/52bb6539a4cf1b12d90005b7
const battleship = {
  neighborsIndex: {
    right: 1,
    left: -1,
    above: -10,
    rightAbove: -9,
    leftAbove: -11,
    down: 10,
    leftDown: 9,
    rightDown: 11,
  },
  correctBoard: {
    battleship: 1,
    cruisers: 2,
    destroyer: 3,
    submarines: 4,
  },
  sizeOfCorrectBoard: {
    4: "battleship",
    3: "cruisers",
    2: "destroyer",
    1: "submarines",
  },
  chipInBoard: {
    battleship: 0,
    cruisers: 0,
    destroyer: 0,
    submarines: 0,
  },
  init: function init(field) {
    this.board = serialize(field);
    this.currentChipSize = 0;
    this.directionToGo = null;
    this.isError = false;
  },
  checkTheBoard: function checkTheBoard() {
    const xAxis = "x";
    const yAxis = "y";
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i] == 0) {
        this.checkShipSize();
        if (this.isError) return false;
        continue;
      }
      this.checkWhichDirectionToGo(i);
      if (this.isError) return false;
      if (this.directionToGo == xAxis) {
        i = this.checkShipInXAxisFrom(i);
        if (this.isError) return false;
      }

      if (this.directionToGo == yAxis) {
        this.checkShipInYAxisFrom(i);
        if (this.isError) return false;
      }
    }
    return true;
  },
  checkShipSize: function checkShipSize() {
    if (this.currentChipSize != 0) {
      if (this.currentChipSize > 4) {
        this.isError = true;
        return;
      }
      this.chipInBoard[this.sizeOfCorrectBoard[this.currentChipSize]]++;
    }
    this.directionToGo = null;
    this.currentChipSize = 0;
  },
  checkWhichDirectionToGo: function checkWhichDirectionToGo(index) {
    const checkRight = this.board[index + this.neighborsIndex["right"]];
    const checkDown = this.board[index + this.neighborsIndex["down"]];
    if (this.currentChipSize == 0) {
      if (checkRight == 1 && checkDown == 1) {
        this.isError = true;
        return;
      }
      if (checkRight == 1) this.directionToGo = "x";
      else if (checkDown == 1) this.directionToGo = "y";
      else this.currentChipSize++; //submarines
    }
  },
  checkShipInXAxisFrom: function checkShipInXAxisFrom(index) {
    const checker = [
      this.board[index + this.neighborsIndex["above"]],
      this.board[index + this.neighborsIndex["rightAbove"]],
      this.board[index + this.neighborsIndex["rightDown"]],
      this.board[index + this.neighborsIndex["down"]],
      this.board[index + this.neighborsIndex["leftDown"]],
    ];
    while (this.board[index] == 1) {
      if (checker.includes(1)) {
        this.isError = true;
        return false;
      }
      this.currentChipSize++;
      this.board[index] = 0;
      index++;
    }
    return index;
  },
  checkShipInYAxisFrom: function checkShipInYAxisFrom(currentIndex) {
    let index = currentIndex;
    const checker = [
      this.board[index + this.neighborsIndex["right"]],
      this.board[index + this.neighborsIndex["rightAbove"]],
      this.board[index + this.neighborsIndex["rightDown"]],
      this.board[index + this.neighborsIndex["leftDown"]],
    ];
    while (this.board[index] == 1) {
      if (checker.includes(1)) {
        this.isError = true;
        return false;
      }
      this.currentChipSize++;

      this.board[index] = 0;
      index += 10;
    }
  },
  isNumberOfChipRight: function isNumberOfChipRight() {
    for (const [chip, sizeOfChips] of Object.entries(this.correctBoard)) {
      if (this.chipInBoard[chip] != sizeOfChips) {
        return false;
      }
    }
    return true;
  },
};
function validateBattlefield(field) {
  battleship.init(field);

  if (!battleship.checkTheBoard()) return false;

  return battleship.isNumberOfChipRight();
}
/*
 * because I love array serialize
 */
function serialize(array) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(...array[i]);
  }
  return result;
}

console.log(
  validateBattlefield([
    [1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ])
);
