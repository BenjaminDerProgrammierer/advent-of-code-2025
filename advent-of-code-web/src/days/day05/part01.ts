export default (input: string): number => {
  const freshRanges = input.split("\n\n")[0].split("\n").map((str) => { return { start: Number.parseInt(str.split('-')[0]), end: Number.parseInt(str.split('-')[1]) } });
  const vegetables = input.split("\n\n")[1].split("\n").map(Number);

  let numFreshVegetables = 0;

  for (const vegetable of vegetables) {
    let isFresh = false;
    for (const freshRange of freshRanges) {
      if (vegetable >= freshRange.start && vegetable <= freshRange.end) {
        isFresh = true;
      }
    }
    if (isFresh) {
      numFreshVegetables++;
    }
  }

  return numFreshVegetables;
}