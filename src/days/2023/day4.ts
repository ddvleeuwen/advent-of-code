import Solution from '../../model/solution.ts';

export default class Day4 extends Solution {
  /* ---- Day Init ---- */
  year = 2023;

  day = 4;

  example = false;
  /* ------------------ */

  getCardsWon(line: string) {
    const cardParts = line.split(': ');
    const cardId = parseInt(cardParts[0].split(' ')[1], 10);

    const gameParts = cardParts[1].split(' | ');
    const winningNumbers = gameParts[0].split(' ').filter((s) => s !== '').map((n) => parseInt(n.trim(), 10));
    const gameNumbers = gameParts[1].split(' ').filter((s) => s !== '').map((n) => parseInt(n.trim(), 10));

    const won = gameNumbers.filter((n) => winningNumbers.includes(n));

    let extra = 0;
    // eslint-disable-next-line no-return-assign
    return won.map(() => cardId + (extra += 1));
  }

  solve(input: string) {
    for (const line of input.split('\n')) {
      const won = this.getCardsWon(line);
      this.a += Math.floor(2 ** won.length / 2);
    }
  }
}
