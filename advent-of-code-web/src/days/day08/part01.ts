export default (input: string): number => {
  const isTest = input.length == 20;

  type Coordinate = { x: number, y: number, z: number }

  const coordinates: Coordinate[] = input.split("\n").map((l) => {
    const [x, y, z] = l.split(",").map(Number);
    return { x, y, z };
  });

  let circuits: number[][] = []

  const processedPairs = new Set<string>();

  let connectionsProcessed = 0;
  while (connectionsProcessed < (isTest ? 10 : 1000)) {
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


    connectionsProcessed++;
    // console.log(`Smallest distance is between points ${JSON.stringify(coordinates[smallestDistanceIndexA])} and ${JSON.stringify(coordinates[smallestDistanceIndexB])}`);
    // console.log(`Current circuits: ${JSON.stringify(circuits.map(c => c.map(i => `${coordinates[i].x},${coordinates[i].y},${coordinates[i].z}`)), null, 2)}`);
    // console.log(`Processed connections: ${connectionsProcessed}`);
  }

  // add single circuits
  for (let i = 0; i < coordinates.length; i++) {
    if (!circuits.some(c => c.includes(i))) {
      circuits.push([i]);
    }
  }

  // sort circuits by their length
  circuits.sort((a, b) => b.length - a.length);

  const result = circuits[0].length * circuits[1].length * circuits[2].length;

  // console.log(circuits.map(c => c.map(i => `${coordinates[i].x},${coordinates[i].y},${coordinates[i].z}`)));
  return result;
}

function calculateEuclideanDistance(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number {
  return Math.hypot(
    (x2 - x1),
    (y2 - y1),
    (z2 - z1)
  );
}