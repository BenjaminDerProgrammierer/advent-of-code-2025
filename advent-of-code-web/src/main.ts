import './setupconsole.ts';
import './style.css';

const dayInput = document.querySelector<HTMLInputElement>("#day-input")!;
const levelInput = document.querySelector<HTMLInputElement>('#level-input')!

const runBtn = document.querySelector<HTMLButtonElement>("#run-button")!;
const clearBtn = document.querySelector<HTMLButtonElement>("#clear-button")!;

const inputLink = document.querySelector<HTMLAnchorElement>("#input-link")!;

runBtn.addEventListener('click', () => {
  const s = dayInput.value;
  const year = Number.parseInt(s.split("-")[0]);
  const day = Number.parseInt(s.split("-")[1]);
  const part = Number.parseInt(s.split("-")[2]);

  if (Number.isNaN(year) || Number.isNaN(day) || Number.isNaN(part)) {
    console.error("Invalid input format. Please use YYYY-DD-P.");
    return;
  }

  if (year < 2015 || day < 1 || day > 25 || part < 1 || part > 2) {
    console.error("Invalid input values. Year must be >= 2015, day must be between 1 and 25, and part must be 1 or 2.");
    return;
  }

  run(year, day, part);
});

clearBtn.addEventListener('click', () => {
  console.clear();
});

async function run(year: number, day: number, part: number) {
  console.log(`Running year: ${year}, day: ${day}, part: ${part}`);
  const input = await getInput(year, day);

  let output: null | number = null;
  try {
    let runDay;
    if (year == 2025) {
      if (day == 1) {
        if (part == 1) {
          runDay = await import(`./days/day01/part01.ts`);
        } else {
          runDay = await import(`./days/day01/part02.ts`);
        }
      } else if (day == 2) {
        if (part == 1) {
          runDay = await import(`./days/day02/part01.ts`);
        } else {
          runDay = await import(`./days/day02/part02.ts`);
        }
      } else if (day == 3) {
        if (part == 1) {
          runDay = await import(`./days/day03/part01.ts`);
        } else {
          throw new Error("Not implemented");
          // runDay = await import(`./days/day03/part02.ts`);
        }
      } else if (day == 4) {
        if (part == 1) {
          runDay = await import(`./days/day04/part01.ts`);
        } else {
          runDay = await import(`./days/day04/part02.ts`);
        }
      } else if (day == 5) {
        if (part == 1) {
          runDay = await import(`./days/day05/part01.ts`);
        } else {
          runDay = await import(`./days/day05/part02.ts`);
        }
      } else if (day == 6) {
        if (part == 1) {
          runDay = await import(`./days/day06/part01.ts`);
        } else {
          runDay = await import(`./days/day06/part02.ts`);
        }
      } else if (day == 7) {
        if (part == 1) {
          runDay = await import(`./days/day07/part01.ts`);
        } else {
          runDay = await import(`./days/day07/part02.ts`);
        }
      } else if (day == 8) {
        if (part == 1) {
          runDay = await import(`./days/day08/part01.ts`);
        } else {
          runDay = await import(`./days/day08/part02.ts`);
        }
      } else if (day == 9) {
        if (part == 1) {
          runDay = await import(`./days/day09/part01.ts`);
        } else {
          throw new Error("Not implemented");
          // runDay = await import(`./days/day09/part02.ts`);
        }
      } else if (day == 10) {
        if (part == 1) {
          runDay = await import(`./days/day10/part01.ts`);
        } else {
          throw new Error("Not implemented");
          // runDay = await import(`./days/day10/part02.ts`);
        }
      } else if (day == 11) {
        if (part == 1) {
          runDay = await import(`./days/day11/part01.ts`);
        } else {
          throw new Error("Not implemented");
          // runDay = await import(`./days/day11/part02.ts`);
        }
      } else if (day == 12) {
        if (part == 1) {
          throw new Error("Not implemented");
          // runDay = await import(`./days/day12/part01.ts`);
        } else {
          throw new Error("Not implemented");
          // runDay = await import(`./days/day12/part02.ts`);
        }
      }
    }
    if (!runDay) {
      throw new Error("Day doesn't exist");
    }
    output = runDay.default(input);
  } catch (error: any) {
    console.error("Error running the specified day:", error.message);
  }

  if (output !== null) {
    console.log("Output:", output);
  }
}

async function getInput(year: number, day: number) {
  if (levelInput.value) {
    const r = levelInput.value;
    levelInput.value = '';
    return r;
  }
  else {
    // fetch from app
    const filePath = `${import.meta.env.BASE_URL}test-inputs/${year}/day${String(day).padStart(2, '0')}.test.in`;

    return fetch(filePath)
      .then(response => {
        if (response.status !== 200) {
          throw new Error(`Unexpected response ${response.status} ${response.statusText}`)
        }
        return response.text()
      });
  }
}

dayInput.addEventListener('input', () => {
  const s = dayInput.value;
  const [yStr, dStr] = s.split('-');
  const y = Number.parseInt(yStr);
  const d = Number.parseInt(dStr);
  if (!Number.isNaN(y) && !Number.isNaN(d)) {
    inputLink.href = `https://adventofcode.com/${y}/day/${d}/input`;
  } else {
    inputLink.removeAttribute('href');
  }
});