import { getInput } from '../helpers'

const input: string = getInput(4);
const lines = input.split("\n");

let numAccesibleBatteries = 0;

for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[i].length; j++) {
    if (lines[i][j] === '.') continue;
    if (calculateNumAdjacentCells(lines, i, j) < 4) {
      numAccesibleBatteries++;
    }
  }
}

console.log(numAccesibleBatteries);

function calculateNumAdjacentCells(lines: string[], r: number, c: number): number {
  let count = 0;
  const rows = lines.length;
  const deltas = [
    [-1, 0], // up
    [1, 0],  // down
    [0, -1], // left
    [0, 1],  // right
    [-1, -1], // up-left
    [-1, 1],  // up-right
    [1, -1],  // down-left
    [1, 1]    // down-right
  ];

  for (const [dr, dc] of deltas) {
    const nr = r + dr;
    const nc = c + dc;
    if (nr < 0 || nr >= rows) continue;
    const row = lines[nr];
    if (!row) continue;
    if (nc < 0 || nc >= row.length) continue;
    if (row[nc] !== '.') count++;
  }

  return count;
}