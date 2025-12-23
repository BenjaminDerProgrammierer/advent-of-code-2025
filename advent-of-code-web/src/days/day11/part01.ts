import { getInput } from '../helpers'

type Machine = {
  id: string;
  pointers: string[];
};

const input = getInput(11);
const machines: Machine[] = input.split('\n').map(line => { return { id: line.split(': ')[0], pointers: line.split(': ')[1].split(' ') }; });

// console.log(machines);

let result = 0;

followPath(machines.find(m => m.id === 'you')!);

function followPath(machine: Machine) {
  if (machine.pointers.includes('out')) {
    result++;
    return;
  }

  for (let pointer of machine.pointers) {
    const nextMachine = machines.find(m => m.id === pointer);
    if (nextMachine) {
      followPath(nextMachine);
    }
  }
}

console.log(result);