import { getInput } from '../helpers'

const input = getInput(7);
const lines = input.split("\n");

let numSplits = 0;

let beamPositions = [lines[0].search('S')];

for (const line of lines) {
  for (const beamPosition of beamPositions) {
    if (line[beamPosition] == '^') {
      numSplits++;
      beamPositions = beamPositions.filter(pos => pos !== beamPosition);
      beamPositions.push(beamPosition - 1, beamPosition + 1);
      beamPositions = [...new Set(beamPositions)];
    }
  }
}

console.log(numSplits);