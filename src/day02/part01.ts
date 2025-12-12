import { getInput } from '../helpers'

const input: string = getInput(2);
const idRanges = input.split(",");

let countInvalidIds = 0;

for (const id of idRanges) {
  let partOne = Number.parseInt(id.split("-")[0]);
  let partTwo = Number.parseInt(id.split("-")[1]);

  // Iterate over all IDs in range
  for (let currentId = partOne; currentId <= partTwo; currentId++) {
    const currentIdString = currentId.toString()
    const len = currentIdString.length

    // Compare first with second half
    if (currentIdString.substring(0,len/2) == currentIdString.substring(len/2)) {
      countInvalidIds += currentId;
    }
  }
}

console.log(countInvalidIds);
