function decodeBits(bits) {
  // ToDo: Accept 0's and 1's, return dots, dashes and spaces
  // const GRAPH_FOR_ONE = {
  //   11: {
  //     1: "-",
  //     0: ".",
  //   },
  // };
  // const GRAPH_FOR_ZERO = {
  //   1: "",
  //   0: " ",
  // };
  // const GRAPH_ROOT = {
  //   11: GRAPH_FOR_ONE,
  //   "00": GRAPH_FOR_ZERO,
  // };
  // be careful this bunch of 00000000000000 will make a problem because it's 7 long chars
  let result = "";
  let j = 0;
  while (j < bits.length) {
    const CODE = {
      wordSpace: "0".repeat(7),
      charSpace: "0".repeat(3),
      dash: "1".repeat(3),
      dot: "11",
      empty: "00",
    };
    let slice = bits.slice(j, j + 7);
    if (slice == CODE.wordSpace) {
      j = j + 7 * 2;
      result += "   ";
      continue;
    }
    slice = bits.slice(j, j + 3);
    if (slice == CODE.charSpace) {
      j = j + 3 * 2;
      result += " ";
      continue;
    }

    if (slice == CODE.dash) {
      j = j + 3 * 2;
      result += "-";
      continue;
    }
    slice = bits.slice(j, j + 2);
    console.log(slice);

    if (slice == CODE.dot) {
      j = j + 1 * 2;
      result += ".";
      continue;
    }

    if (slice == CODE.empty) {
      j = j + 1 * 2;
      result += "";
      continue;
    }
  }
  return result;
}

function decodeMorse(morseCode) {
  // ToDo: Accept dots, dashes and spaces, return human-readable message

  return morseCode;
}

console.log(decodeMorse(decodeBits("11001100110011"), "H"));
// console.log(
//   decodeMorse(
//     decodeBits(
//       "1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011"
//     )
//   ),
//   "HEY JUDE"
// );
