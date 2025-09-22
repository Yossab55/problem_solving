//+ in the Name of Cross
//# problem link on code wars: https://www.codewars.com/kata/688a614adfe03af512d4458c
function subsetSum(numbers, target) {
  //working
  const earlyTerminateValue = earlyTerminate(numbers, target);
  if (earlyTerminateValue !== undefined) return earlyTerminateValue;

  //todo open you notebook
  return true;
}

function earlyTerminate(numbers, target) {
  if (target == 0) return [];
  const isAllEvenNumbers = numbers.every((number) => number % 2 == 0);
  const targetIsOdd = target % 2;
  if (isAllEvenNumbers && targetIsOdd) return null;

  return undefined;
}
console.log(subsetSum([1, 2, 3, 4, 5], 6));
console.log(subsetSum([2, 4, 6, 8, 10], 17));
