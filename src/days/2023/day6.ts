import Solution from '../../model/solution.ts';

export default class Day6 extends Solution {
  /* ---- Day Init ---- */
  year = 2023;

  day = 6;

  example = false;
  /* ------------------ */

  getWinAmount(race: any) {
    let amountWon = 0;
    for (let ms = 0; ms < race.time + 1; ms += 1) {
      const amount = race.time - ms;

      if (amount * ms > race.distance) {
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

    const races = inputArrays[0]
      .map((value, index) => ({ time: value, distance: inputArrays[1][index] }));

    this.a = 1;

    for (const race of races) {
      this.a *= this.getWinAmount(race);
    }

    const raceParts = inputParts.map((g) => g.split(':')[1].replaceAll(' ', '')).map((n) => parseInt(n, 10));
    const race = { time: raceParts[0], distance: raceParts[1] };
    this.b = this.getWinAmount(race);
  }
}
