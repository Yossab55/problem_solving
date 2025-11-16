// In the name of Cross
// link of the problem: https://www.codewars.com/kata/52bb6539a4cf1b12d90005b7

/**
 * Rules of the Game:
 *    1. There must be single battleship (size of 4 cells), 
 *      2 cruisers (size 3), 3 destroyers (size 2) and 4 submarines (size 1). 
 *      Any additional ships are not allowed, as well as missing ships.
 *
 *    2. Each ship must be a straight line, except for submarines, which are just single cell.
 *    
 *    3. The ship cannot overlap or be in contact with any other ship, 
 *        neither by edge nor by corner.
 *        يعني مفيش تداخل ومفيش اتنين لازقين في بعض من اي اتجاه
 * 
 *  Sample of test:
 *    [
        [1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
        [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
        [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ] true
 */

function validateBattlefield(field) {
  const fieldSerialized = serialize(field);
  const neighbors = {
    right: 1,
    left: -1,
    above: -10,
    rightAbove: -9,
    leftAbove: -11,
    down: 10,
    leftDown: 9,
    rightDown: 11,
  };
  const chipInBoard = {
    battleship: 0,
    cruisers: 0,
    destroyer: 0,
    submarines: 0,
  };
  const sizeOfChip = {
    4: "battleship",
    3: "cruisers",
    2: "destroyer",
    1: "submarines",
  };
  const rightNumberOfChips = {
    battleship: 1,
    cruisers: 2,
    destroyer: 3,
    submarines: 4,
  };
  const xAxis = "x";
  const yAxis = "y";
  let currentSizeChip = 0;
  let directOfChip = undefined;

  for (let i = 0; i < fieldSerialized.length; i++) {
    if (fieldSerialized[i] == 0) {
      /** I don't have to check for 0's
       * but If I have a chip and reached zero index so I need to see which chep is it
       */
      console.log("index " + i);
      console.log("currentSizeChip " + currentSizeChip);
      if (currentSizeChip != 0) {
        if (currentSizeChip > 4) return false;
        chipInBoard[sizeOfChip[currentSizeChip]]++;
      }
      directOfChip = undefined;
      currentSizeChip = 0;
      continue;
    }
    const checkRight = fieldSerialized[i + neighbors["right"]];
    const checkDown = fieldSerialized[i + neighbors["down"]];
    if (currentSizeChip == 0) {
      if (checkRight == 1 && checkDown == 1) {
        return false;
      }
      if (checkRight == 1) directOfChip = xAxis;
      else if (checkDown == 1) directOfChip = yAxis;
      else currentSizeChip++; //submarines
    }
    if (directOfChip == xAxis) {
      const checker = [
        fieldSerialized[i + neighbors["above"]],
        fieldSerialized[i + neighbors["rightAbove"]],
        fieldSerialized[i + neighbors["rightDown"]],
        fieldSerialized[i + neighbors["down"]],
        fieldSerialized[i + neighbors["leftDown"]],
      ];
      while (fieldSerialized[i] == 1) {
        if (checker.includes(1)) return false;
        currentSizeChip++;
        fieldSerialized[i] = 0;
        i++;
      }
    }
    if (directOfChip == yAxis) {
      let index = i;
      const checker = [
        fieldSerialized[index + neighbors["right"]],
        fieldSerialized[index + neighbors["rightAbove"]],
        fieldSerialized[index + neighbors["rightDown"]],
        fieldSerialized[i + neighbors["leftDown"]],
      ];
      while (fieldSerialized[index] == 1) {
        if (checker.includes(1)) return false;
        currentSizeChip++;
        fieldSerialized[index] = 0;
        index += 10;
      }
    }
  }
  // don't forget when you finish check chipIn board with rightNumberOfChips
  // if it passed all conditions return true
  for (const [chip, numberOfChip] of Object.entries(rightNumberOfChips)) {
    console.log("chip " + chip);
    console.log("numberOfChip " + numberOfChip);
    console.log(chipInBoard);
    if (chipInBoard[chip] != numberOfChip) {
      return false;
    }
  }
  return true;
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
