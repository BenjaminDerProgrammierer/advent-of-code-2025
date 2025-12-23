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
  const filePath = `./days/day${String(day).padStart(2, '0')}/part${String(part).padStart(2, '0')}.ts`; // Default export is (input): output there.
  const input = await getInput(year, day);

  let output: null | number = null;
  try {
    /* @vite-ignore */
    const runDay = await import(filePath);
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
    const filePath = `/test-inputs/${year}/day${String(day).padStart(2, '0')}.test.in`;

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