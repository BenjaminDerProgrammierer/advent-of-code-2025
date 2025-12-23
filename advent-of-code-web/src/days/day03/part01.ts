export default (input: string): number => {
  const banks = input.split("\n");

  let sumBatteryPower = 0;

  for (const bank of banks) {
    const batteries: number[] = bank.split("").map(Number);

    const possibleJoltages = []

    for (let i = 0; i < batteries.length; i++) {
      const firstPart = batteries[i];
      for (let j = i + 1; j < batteries.length; j++) {
        const secondPart = batteries[j];

        possibleJoltages.push(parseInt(`${firstPart}${secondPart}`));
      }
    }

    possibleJoltages.sort((a, b) => b - a);
    sumBatteryPower += possibleJoltages[0]
  }

  return sumBatteryPower
}