type Machine = {
  lights: boolean[];
  buttonWiring: number[][];
  joltageRequirement: number[];
}

export default (input: string): number => {
  const machines: Machine[] = input.split("\n").map((l) => {
    return {
      lights: l.split("[")[1].split("]")[0].split("").map(ch => ch === "#"),
      buttonWiring: l.split("]")[1].split("{")[0].split(" ").filter(b => b.length > 0).map((b) => {
        return b.split("(")[1].split(")")[0].split(",").map(Number)
      }),
      joltageRequirement: l.split("{")[1].split("}")[0].split(",").map(Number)
    }
  });

  // console.log(machines)

  let sumPresses = 0;

  for (const machine of machines) {
    for (const _element of machine.buttonWiring) {
      const nButtons = machine.buttonWiring.length;
      let found = false;

      for (let presses = 0; presses <= nButtons && !found; presses++) {
        // Use DFS to find combinations of button presses, and return first valid one
        const dfs = (start: number, left: number, combo: number[]) => {
          if (found) return;
          if (left === 0) {
            let current = new Array(machine.lights.length).fill(false);
            for (const btn of combo) pushButton(machine, btn, current);
            if (equalArrays(current, machine.lights)) {
              sumPresses += presses;
              found = true;
            }
            return;
          }
          for (let j = start; j <= nButtons - left; j++) {
            combo.push(j);
            dfs(j + 1, left - 1, combo);
            combo.pop();
            if (found) return;
          }
        };

        dfs(0, presses, []);
      }

      if (found) break;
    }
  }

  return sumPresses;
}

function pushButton(machine: Machine, buttonId: number, currentLights: boolean[]): boolean[] {
  if (buttonId >= machine.buttonWiring.length) {
    throw new Error("Button ID out of range");
  }

  const button = machine.buttonWiring[buttonId];
  for (const s of button) {
    currentLights[s] = !currentLights[s];
  }
  return currentLights
}

function equalArrays(a: boolean[], b: boolean[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}