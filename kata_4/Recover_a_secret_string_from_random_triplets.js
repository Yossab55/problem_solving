//+ in the name of cross
//# problem: https://www.codewars.com/kata/53f40dff5f9d31b813000774
const recoverSecret = function (triplets) {
  const Graph = new Topological(triplets);
  return Graph.getResult();
};

class Topological {
  constructor(triplets) {
    this.triplets = triplets;
    this.mainGraph = {};
    this.degree = {};
    this.result = [];
  }
  getResult() {
    this.#createGraph();
    this.#sort();
    return this.result.join("");
  }
  #createGraph() {
    this.mainGraph = {};
    while (this.triplets.length) {
      const triplet = this.triplets.shift();
      while (triplet.length - 1) {
        this.#handlingAddValueToMainGraph(triplet);
      }
    }
    delete this.triplets;
    delete this.char;
  }
  #handlingAddValueToMainGraph(triplet) {
    this.char = triplet.shift();
    if (!this.mainGraph[this.char]) {
      this.mainGraph[this.char] = triplet[0];
      this.degree[triplet[0]] = (this.degree[triplet[0]] || 0) + 1;
      if (!this.degree[this.char]) this.degree[this.char] = 0;
    } else if (this.mainGraph[this.char]) {
      if (!this.#checkIfItemExistsAlready(triplet[0])) {
        this.#convertValueToArray();
        this.mainGraph[this.char].push(triplet[0]);
        this.degree[triplet[0]] = (this.degree[triplet[0]] || 0) + 1;
      }
    }
  }
  #convertValueToArray() {
    const currentValue = this.mainGraph[this.char];
    if (typeof currentValue == "object") return;
    this.mainGraph[this.char] = [currentValue];
  }
  #checkIfItemExistsAlready(valueToSearch) {
    const currentValue = this.mainGraph[this.char];
    if (typeof currentValue == "string")
      return currentValue == valueToSearch ? true : false;
    return currentValue.includes(valueToSearch);
  }
  #sort() {
    const size = Object.keys(this.degree).length;
    let counter = 0;
    while (counter < size) {
      this.#findDegreeOfZero();
      counter++;
    }
    console.log(this.result);
  }
  #findDegreeOfZero() {
    this.tempDegree = Object.entries(this.degree);
    for (let i = 0; i < this.tempDegree.length; i++) {
      const degreeValueIndex = 1;

      const currentChar = this.tempDegree[i][degreeValueIndex];
      if (this.#checkIfThisIsDegreeOfZero(currentChar)) {
        const charIndex = 0;
        const char = this.tempDegree[i][charIndex];
        this.#addChar(char);
      }
    }
  }
  #checkIfThisIsDegreeOfZero(currentChar) {
    const degreeValueZero = 0;
    if (currentChar == degreeValueZero) {
      return true;
    }
    return false;
  }
  #addChar(char) {
    const value = char;
    this.#decreaseDegreeFrom(value);
    delete this.degree[value];
    delete this.mainGraph[value];
    this.result.push(value);
  }
  #decreaseDegreeFrom(value) {
    const charsToDecreaseDegree = this.mainGraph[value];
    if (typeof charsToDecreaseDegree == "string") {
      this.degree[charsToDecreaseDegree]--;
    } else if (charsToDecreaseDegree) {
      for (const char of charsToDecreaseDegree) {
        this.degree[char]--;
      }
    }
  }
}

triplets1 = [
  ["t", "u", "p"],
  ["w", "h", "i"],
  ["t", "s", "u"],
  ["a", "t", "s"],
  ["h", "a", "p"],
  ["t", "i", "s"],
  ["w", "h", "s"],
];
console.log(recoverSecret(triplets1));
function deepSeekAnswer(triplets) {
  const graph = new Map();
  const inDegree = new Map();

  const addNode = (char) => {
    if (!graph.has(char)) graph.set(char, []);
    if (!inDegree.has(char)) inDegree.set(char, 0);
  };
  for (const [a, b, c] of triplets) {
    addNode(a);
    addNode(b);
    addNode(c);

    if (!graph.get(a).includes(b)) {
      graph.get(a).push(b);
      inDegree.set(b, inDegree.get(b) + 1);
    }

    if (!graph.get(b).includes(c)) {
      graph.get(b).push(c);
      inDegree.set(c, inDegree.get(c) + 1);
    }
  }

  const queue = [];
  for (const [node, degree] of inDegree) {
    if (degree == 0) queue.push(node);
  }
  const result = [];
  while (queue.length) {
    const node = queue.shift();
    result.push(node);

    for (const neighbor of graph.get(node)) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (indexedDB.get(neighbor) == 0) queue.push(neighbor);
    }
  }
  return result.join("");
}
