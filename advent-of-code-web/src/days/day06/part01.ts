import { getInput } from '../helpers'

const input = getInput(6);
const lines = input.split("\n");

let operations: string[] = lines.pop()!.split(" ").filter((v) => v != ""); // also removes last line
let operandsRaw: number[][] = lines.map((line) => line.split(" ").filter((v) => v != "").map(Number));

let operandsList: number[][] = [];
for (let c = 0; c < operandsRaw[0].length; c++) {
  const row: number[] = [];
  for (let r = operandsRaw.length - 1; r >= 0; r--) {
    row.push(operandsRaw[r][c]);
  }
  operandsList.push(row);
}

let resultSum = 0
for (let i = 0; i < operations.length; i++) {
  const operation = operations[i];
  const operands = operandsList[i];

  let result = 0;
  switch (operation) {
    case '+':
      // console.log("Adding operands:", operands);
      for (const o of operands) {
        result += o;
      }
      break;
    case '*':
      // console.log("Multiplying operands:", operands);
      result = 1;
      for (const o of operands) {
        result *= o;
      }
      break;
  }
  // console.log("Result of operation:", result);
  resultSum += result;
}

console.log(resultSum);
