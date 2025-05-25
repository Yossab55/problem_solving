String.prototype.customTrim = function (char = " ") {
  let indexOfCutStart = 0;
  let indexOfCutEnd = this.length;

  for (let i = 0; i < this.length; i++) {
    if (this[i] == char) indexOfCutStart++;
    else break;
  }

  for (let j = this.length - 1; j >= 0; j--) {
    if (this[j] == char) indexOfCutEnd--;
    else break;
  }
  return this.slice(indexOfCutStart, indexOfCutEnd);
};
function decodeBits(bits) {
  bits = bits.customTrim("0");
  console.log(bits);
  const CODE = {
    wordSpace: "0".repeat(7),
    charSpace: "0".repeat(3),
    dash: "1".repeat(3),
    dot: "11",
    empty: "00",
  };
  let result = "";
  let j = 0;
  while (j < bits.length) {
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
function getFrequencyFrom(bits) {}
function decodeMorse(morseCode) {
  const MORSE_CODE = {
    ".-": "A",
    "-...": "B",
    "-.-.": "C",
    "-..": "D",
    ".": "E",
    "..-.": "F",
    "--.": "G",
    "....": "H",
    "..": "I",
    ".---": "J",
    "-.-": "K",
    ".-..": "L",
    "--": "M",
    "-.": "N",
    "---": "O",
    ".--.": "P",
    "--.-": "Q",
    ".-.": "R",
    "...": "S",
    "-": "T",
    "..-": "U",
    "...-": "V",
    ".--": "W",
    "-..-": "X",
    "-.--": "Y",
    "--..": "Z",
    "-----": "0",
    ".----": "1",
    "..---": "2",
    "...--": "3",
    "....-": "4",
    ".....": "5",
    "-....": "6",
    "--...": "7",
    "---..": "8",
    "----.": "9",
  };
  secondSpace = false;
  return morseCode
    .split(" ")
    .map((ele) => {
      ele = ele.trim();
      if (ele == "") {
        if (!secondSpace) {
          secondSpace = true;
          return " ";
        } else secondSpace = false;
      }

      if (MORSE_CODE[ele]) return MORSE_CODE[ele];

      return "";
    })
    .join("");
}

console.log(decodeMorse(decodeBits("0011001100110011"), "H"));
// console.log(
//   decodeMorse(
//     decodeBits(
//       "1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011"
//     )
//   ),
//   "HEY JUDE"
// );
