import Solution from '../../model/solution.ts';

export default class Day4 extends Solution {
  /* ---- Day Init ---- */
  year = 2023;

  day = 4;

  example = false;
  /* ------------------ */

  getCardValue(cardsToCheck: number[], lines: string[]) {
    if (cardsToCheck.length === 0) {
      return 1;
    }

    let newRes: number = 0;

    for (const crdId of cardsToCheck) {
      const won = this.getCardsWon(lines[crdId - 1]);
      newRes += this.getCardValue(won, lines);
    }

    // test
    return newRes + 1;
  }

  getCardsWon(line: string) {
    const cardParts = line.split(': ');
    const cardId = parseInt(cardParts[0].split(' ').filter((s) => s !== '')[1], 10);

    const gameParts = cardParts[1].split(' | ');
    const winningNumbers = gameParts[0].split(' ').filter((s) => s !== '').map((n) => parseInt(n.trim(), 10));
    const gameNumbers = gameParts[1].split(' ').filter((s) => s !== '').map((n) => parseInt(n.trim(), 10));

    const won = gameNumbers.filter((n) => winningNumbers.includes(n));

    let extra = 0;
    // eslint-disable-next-line no-return-assign
    return won.map(() => cardId + (extra += 1));
  }

  solve(input: string) {
    const lines = input.split('\n');
    for (const line of lines) {
      const won = this.getCardsWon(line);

      this.b += this.getCardValue(won, lines);
      this.a += Math.floor(2 ** won.length / 2);
    }
  }
}
