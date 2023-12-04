import Solution from './model/solution.ts';
import { getInput, fetchInput } from './util/input.ts';

import Day1 from './days/2023/day1.ts';
import Day2 from './days/2023/day2.ts';
import Day3 from './days/2023/day3.ts';
import Day4 from './days/2023/day4.ts';

const solutions: Solution[] = [
  new Day1(),
  new Day2(),
  new Day3(),
  new Day4(),
];

const runSolution = async (solution) => {
  console.log(`\x1b[33mRunning solutions for Day ${solution.day} of ${solution.year}\x1b[0m`);

  const input = await getInput(solution.year, solution.day, solution.example)
    .catch(() => fetchInput(solution.year, solution.day, solution.example));

  const before = Date.now();
  solution.solve(input);
  const after = Date.now();

  console.log(`(finished in ${after - before}ms)`);
  console.log(` - 1st part: ${solution.a}`);
  console.log(` - 2nd part: ${solution.b}`);
  console.log('');
};

const runSolutions = async () => {
  for (const solution of solutions) {
    await runSolution(solution);
  }
};

runSolutions();
