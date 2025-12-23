export default (input: string): number => {
  const lines = input.split("\n");

  function getMapIndex(m: Map<number, number>, p: number): number {
    return m.has(p) ? m.get(p)! : 1
  }

  let nextBeamPositions = new Map<number, number>();
  for (let i = lines.length - 1; i >= 0; i--) {
    const currentBeamPositions = new Map<number, number>();

    const positions = new Set<number>();
    for (let p = 0; p < lines[i].length; p++) {
      positions.add(p);
    }

    for (const p of positions) {
      if (lines[i][p] === '^') {
        currentBeamPositions.set(p, getMapIndex(nextBeamPositions, p - 1) + getMapIndex(nextBeamPositions, p + 1)); // branch beam
      } else {
        currentBeamPositions.set(p, getMapIndex(nextBeamPositions, p)); // continue straight
      }
    }

    nextBeamPositions = currentBeamPositions;
  }

  const numTimelines = getMapIndex(nextBeamPositions, lines[0].search('S'));

  return numTimelines;
}