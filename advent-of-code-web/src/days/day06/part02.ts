import { getInput } from '../helpers'

const input = getInput(6);
const lines = input.split("\n");

let operations: string[] = lines.pop()!.split(" ").filter(op => op.length > 0); // also removes last line

let operandsList: string[] = [];
let operandsAll: string[][] = [];
for (let c = 0; c < lines[0].length; c++) {
  let row: string = "";
  for (const e of lines) {
    row += e[c];
  }

  if (row.split("").every(v => v == " ")) {
    operandsAll.push(operandsList);
    operandsList = [];
    continue;
  }
  operandsList.push(row);
}
operandsAll.push(operandsList);

const operandsAllNumbers = operandsAll.map((o) => o.map(Number));

let resultSum = 0
for (let i = 0; i < operations.length; i++) {
  const operation = operations[i];
  const operands = operandsAllNumbers[i];

  let result = 0;
  switch (operation) {
    case '+':
      for (const o of operands) {
        result += o;
      }
      break;
    case '*':
      result = 1;
      for (const o of operands) {
        result *= o;
      }
      break;
  }
  resultSum += result;
}

console.log(resultSum);