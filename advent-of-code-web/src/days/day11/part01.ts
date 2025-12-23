export default (input: string): number => {

  type Machine = {
    id: string;
    pointers: string[];
  };

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
  
  return result;
}