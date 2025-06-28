//+ in the name of cross
const recoverSecret = function (triplets) {
  const Graph = new Topological(triplets);
  Graph.createGraph();
  console.log(Graph);
  //# now you have graph ready and degree graph ready
  //todo now you need to search for degree of 0 and build the result;
};

class Topological {
  constructor(triplets) {
    this.triplets = triplets;
    this.mainGraph = {};
    this.degree = {};
  }
  createGraph() {
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
      this.#convertValueToArray();
      if (!this.#checkIfItemExistsAlready(triplet[0])) {
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
