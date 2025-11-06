// In The name of Cross
// link of code in CodeWars: https://www.codewars.com/kata/58e24788e24ddee28e000053

function simple_assembler(program) {
  if (!program) return {};
  const result = {};
  const rules = {
    inc: function inc(register, y) {
      result[register]++;
    },
    dec: function dec(register, y) {
      result[register]--;
    },
    mov: function createRegister(mov, y) {
      result[mov] = Number(y == Number(y) ? y : result[y]);
    },
    jnz: function chickRegister(register) {
      return result[register] == 0 ? false : true;
    },
  };
  for (let i = 0; i < program.length; i++) {
    const [instructor, register, y] = program[i].split(" ");
    if (instructor == "jnz") {
      if (rules[instructor](register)) i += Number(y) - 1;
      continue;
    }
    rules[instructor](register, y);
  }
  return result;
}

console.log(
  simple_assembler(["mov a 5", "inc a", "dec a", "dec a", "jnz a -1", "inc a"])
);
console.log(
  simple_assembler(["mov a -10", "mov b a", "inc a", "dec b", "jnz a -2"])
);
