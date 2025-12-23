import { getInput } from '../helpers'

type Machine = {
    id: string;
    pointers: string[];
};

const input = getInput(11);
const machines: Machine[] = input.split('\n').map(line => { return { id: line.split(': ')[0], pointers: line.split(': ')[1].split(' ') }; });

// console.log(machines);

let result: string[][] = [];

followPath(machines.find(m => m.id === 'svr')!);

function followPath(machine: Machine, visited: string[] = []) {
    if (visited.includes(machine.id)) {
        return;
    }

    if (machine.id === 'out') {
        result.push(visited);
        return;
    }

    for (let pointer of machine.pointers) {
        const nextMachine = machines.find(m => m.id === pointer);
        if (nextMachine) {
            followPath(nextMachine, [...visited, machine.id]);
        }
    }
}

result = result.filter(path => path.includes('fft') && path.includes('dac'));

console.log(result);
console.log(result.length);

