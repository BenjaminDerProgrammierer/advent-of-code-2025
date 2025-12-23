export default (input: string): number => {
  const lines = input.split("\n");

  let position = 50;
  let countZero = 0;

  for (const line of lines) {
    const isPositive = line.substring(0, 1) === "R";
    const turnTicks = Number.parseInt(line.substring(1))

    if (isPositive) {
      position += turnTicks;
    } else {
      position -= turnTicks;
    }

    position = (position + 100) % 100;

    if (position === 0) {
      countZero++;
    }
  }

  return countZero;
}