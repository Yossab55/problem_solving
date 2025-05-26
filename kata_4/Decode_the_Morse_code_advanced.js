//# link of the problem: https://www.codewars.com/kata/54b72c16cd7f5154e9000457
String.prototype.trimZeros = function () {
  return this.replace(/^0+|0+$/g, "");
};
function decodeBits(bits) {
  bits = bits.trimZeros();
  console.log(bits);
  const frequency = getFrequencyFrom(bits);
  getCodeBits.frequency = frequency;
  const result = getMorseCodeFrom(bits);
  return result;
}
function getFrequencyFrom(bits) {
  const runs = bits.match(/(1+|0+)/g);
  return Math.min(...runs.map((run) => run.length));
}
function getMorseCodeFrom(bits) {
  const codeMap = [
    [getCodeBits("wordSpace"), "   "],
    [getCodeBits("charSpace"), " "],
    [getCodeBits("dash"), "-"],
    [getCodeBits("dot"), "."],
    [getCodeBits("empty"), ""],
  ];

  let result = "";
  let i = 0;
  while (i < bits.length) {
    for (const [bitsSequence, symbol] of codeMap) {
      console.log(bitsSequence, symbol);
      console.log(bitsSequence, symbol);
      if (bits.startsWith(bitsSequence, i)) {
        result += symbol;
        console.log(result);
        i += bitsSequence.length;
        break;
      }
    }
  }
  return result;
}
function getCodeBits(slice) {
  const CODE = {
    wordSpace: "0".repeat(7 * getCodeBits.frequency),
    charSpace: "0".repeat(3 * getCodeBits.frequency),
    dash: "1".repeat(3 * getCodeBits.frequency),
    dot: "1".repeat(getCodeBits.frequency),
    empty: "0".repeat(getCodeBits.frequency),
  };
  return CODE[slice];
}

function decodeMorse(morseCode) {
  return morseCode
    .split("   ")
    .map((word) =>
      word
        .split(" ")
        .map((letter) => morseMapOf(letter))
        .join("")
    )
    .join(" ");
}
function morseMapOf(code) {
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
    ".-.-.-": ".",
  };
  return MORSE_CODE[code];
}

console.log(
  decodeMorse(
    decodeBits(
      "1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011"
    )
  )
);

// console.log(decodeMorse(decodeBits("111")));
// console.log(decodeMorse(decodeBits("1110111")));
// console.log(
//   decodeMorse(
//     decodeBits(
//       "00011100010101010001000000011101110101110001010111000101000111010111010001110101110000000111010101000101110100011101110111000101110111000111010000000101011101000111011101110001110101011100000001011101110111000101011100011101110001011101110100010101000000011101110111000101010111000100010111010000000111000101010100010000000101110101000101110001110111010100011101011101110000000111010100011101110111000111011101000101110101110101110"
//     )
//   )
// );
