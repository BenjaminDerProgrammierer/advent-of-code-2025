export default (input: string): number => {
  const idRanges = input.split(",");

  let countInvalidIds = 0;

  for (const id of idRanges) {
    let partOne = Number.parseInt(id.split("-")[0]);
    let partTwo = Number.parseInt(id.split("-")[1]);

    // Iterate over all IDs in range
    for (let currentId = partOne; currentId <= partTwo; currentId++) {
      const currentIdString = currentId.toString()
      const len = currentIdString.length
      let isWrong = true;
      for (let parts = 2; parts <= len; parts++) {
        const subStrings = [];

        if (len % parts != 0) {
          continue;
        }

        for (let j = 0; j < parts; j++) {
          subStrings.push(currentIdString.substring((len / parts) * (j), (len / parts) * (j + 1)));
        }

        let wrong = false;
        for (let subString of subStrings) {
          if (subString != subStrings[0]) {
            wrong = true;
          }
        }
        if (!wrong) {
          isWrong = false;
          break;
        }
        // console.log(`${subStrings} | ${!isWrong}`)
      }

      // console.log(`${currentId} is ${!isWrong}`)
      if (!isWrong) {
        countInvalidIds += currentId;
      }
    }
  }
  return countInvalidIds;
}
