import Solution from '../../model/solution.ts';

export default class Day2 extends Solution {
  /* ---- Day Init ---- */
  year = 2023;

  day = 2;

  example = false;
  /* ------------------ */

  maxCubes: any = {
    red: 12,
    green: 13,
    blue: 14,
  };

  solve(input: string) {
    const possibleGames: number[] = [];
    const powers: number[] = [];

    for (const game of input.split('\n')) {
      const parts = game.split(': ');
      const gameId = parseInt(parts[0].split(' ')[1], 10);

      const rounds = parts[1].trim().split('; ');
      let possible = true;

      const minCubes: any = {
        red: 0,
        green: 0,
        blue: 0,
      };

      for (const round of rounds) {
        const cubes = round.split(', ');

        for (const cube of cubes) {
          const cubeParts = cube.split(' ');
          const amount = parseInt(cubeParts[0], 10);
          const color = cubeParts[1];

          if (minCubes[color] < amount) {
            minCubes[color] = amount;
          }

          if (this.maxCubes[color] < amount) {
            possible = false;
          }
        }
      }

      powers.push(
        Object.values(minCubes)
          .map((v) => parseInt(`${v}`, 10))
          .reduce((partialSum, a) => partialSum * a, 1),
      );

      if (possible) {
        possibleGames.push(gameId);
      }
    }

    this.a = possibleGames.reduce((partialSum, a) => partialSum + a, 0);
    this.b = powers.reduce((partialSum, a) => partialSum + a, 0);
  }
}
