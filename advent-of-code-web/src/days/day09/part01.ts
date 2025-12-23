export default (input: string): number => {

  type Coordinate = {
    x: number;
    y: number;
  }

  const coordinates: Coordinate[] = input.split("\n").map((l) => { return { x: Number.parseInt(l.split(',')[0]), y: Number.parseInt(l.split(',')[1]) } });

  console.log(coordinates)

  let maxArea = 0;
  for (let i = 0; i < coordinates.length; i++) {
    for (let j = i + 1; j < coordinates.length; j++) {
      const a = coordinates[i];
      const b = coordinates[j];
      // A and B are corners of the rectangle
      const area = Math.abs(a.x - b.x + 1) * Math.abs(a.y - b.y + 1);
      if (area > maxArea) {
        maxArea = area;
      }
    }
  }

  return maxArea;
}