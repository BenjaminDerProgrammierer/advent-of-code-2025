export default (input: string): number => {

  type Coordinate = { x: number, y: number, z: number }

  const coordinates: Coordinate[] = input.split("\n").map((l) => {
    const [x, y, z] = l.split(",").map(Number);
    return { x, y, z };
  });

  let circuits: number[][] = []

  const processedPairs = new Set<string>();
  const connectedXCoordinates: number[] = [];

  while (true) {
    let smallestDistance = Infinity;
    let smallestDistanceIndexA = -1;
    let smallestDistanceIndexB = -1;
    for (let i = 0; i < coordinates.length; i++) {
      for (let j = i + 1; j < coordinates.length; j++) {
        const pairKey = `${i},${j}`;
        if (processedPairs.has(pairKey)) continue;

        const euclideanDistance = calculateEuclideanDistance(coordinates[i].x, coordinates[i].y, coordinates[i].z, coordinates[j].x, coordinates[j].y, coordinates[j].z);
        if (euclideanDistance < smallestDistance) {
          smallestDistance = euclideanDistance;
          smallestDistanceIndexA = i;
          smallestDistanceIndexB = j;
          connectedXCoordinates.push(coordinates[i].x, coordinates[j].x);
        }
      }
    }

    processedPairs.add(`${smallestDistanceIndexA},${smallestDistanceIndexB}`);

    let existingCircuits = circuits.filter(c => c.includes(smallestDistanceIndexA) || c.includes(smallestDistanceIndexB));
    if (existingCircuits.length > 0) {
      const existingCircuitSet = new Set(existingCircuits.flat());
      // Remove existing circuits that include either of the points
      circuits = circuits.filter(c => !existingCircuits.includes(c));

      // Add points to existing circuit
      existingCircuitSet.add(smallestDistanceIndexA);
      existingCircuitSet.add(smallestDistanceIndexB);

      circuits.push(Array.from(existingCircuitSet));
    } else {
      // Add new circuit
      circuits.push([smallestDistanceIndexA, smallestDistanceIndexB]);
    }

    let numSingleCircuits = 0;
    for (let i = 0; i < coordinates.length; i++) {
      if (!circuits.some(c => c.includes(i))) {
        numSingleCircuits++;
      }
    }
    if (numSingleCircuits === 0) {
      break;
    }

    // console.log("Number of circuits:", circuits.length, processedPairs.size);
  }

  const result = connectedXCoordinates.at(-1)! * connectedXCoordinates.at(-2)!;

  return result;
}

function calculateEuclideanDistance(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number {
  return Math.hypot(
    (x2 - x1),
    (y2 - y1),
    (z2 - z1)
  );
}