import Solution from '../../model/solution.ts';

export default class Day6 extends Solution {
  /* ---- Day Init ---- */
  year = 2023;

  day = 6;

  example = false;
  /* ------------------ */

  getWinAmount(game: any) {
    let amountWon = 0;
    for (let ms = 0; ms < game.time + 1; ms += 1) {
      const amount = game.time - ms;

      if (amount * ms > game.distance) {
        amountWon += 1;
      }
    }

    return amountWon;
  }

  solve(input: string) {
    const inputParts = input.split('\n');
    const inputArrays = inputParts
      .map((part) => part
        .split(' ')
        .filter((s) => s !== '')
        .slice(1)
        .map((n) => parseInt(n, 10)));

    const games = inputArrays[0]
      .map((value, index) => ({ time: value, distance: inputArrays[1][index] }));

    this.a = 1;

    for (const game of games) {
      this.a *= this.getWinAmount(game);
    }

    const gameParts = inputParts.map((g) => g.split(':')[1].replaceAll(' ', '')).map((n) => parseInt(n, 10));
    const game = { time: gameParts[0], distance: gameParts[1] };
    this.b = this.getWinAmount(game);
  }
}
