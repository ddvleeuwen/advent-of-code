import Solution from '../../model/solution.ts';
import { getMultipleIndexOf, isNum } from '../../util/functions.ts';

export default class Day2 extends Solution {
  /* ---- Day Init ---- */
  year = 2023;

  day = 3;

  example = false;
  /* ------------------ */

  touchesSpecialCharacter(gridNum: any, grid: string[], gears: Map<string, any>): boolean {
    let touches = false;

    // check right
    const right = grid[gridNum.y][gridNum.x + gridNum.v.length];
    if (right && right !== '.') {
      const rightGear = gears.get(`${gridNum.y}-${gridNum.x + gridNum.v.length}`) ?? { amount: 0, val: 1 };
      gears.set(`${gridNum.y}-${gridNum.x + gridNum.v.length}`, { amount: rightGear.amount + 1, val: rightGear.val * gridNum.v });
      touches = true;
    }

    // check left
    const left = grid[gridNum.y][gridNum.x - 1];
    if (left && left !== '.') {
      const leftGear = gears.get(`${gridNum.y}-${gridNum.x - 1}`) ?? { amount: 0, val: 1 };
      gears.set(`${gridNum.y}-${gridNum.x - 1}`, { amount: leftGear.amount + 1, val: leftGear.val * gridNum.v });
      touches = true;
    }

    // check top
    const top = grid[gridNum.y - 1]
      ?.slice(Math.max(gridNum.x - 1, 0), gridNum.x + gridNum.v.length + 1);

    if (top && /[^\d^.]/.test(top)) {
      const xs = getMultipleIndexOf(top, '*').result.map((i) => i + Math.max(gridNum.x - 1, 0));

      xs.forEach((topX) => {
        const rightGear = gears.get(`${gridNum.y - 1}-${topX}`) ?? { amount: 0, val: 1 };
        gears.set(`${gridNum.y - 1}-${topX}`, { amount: rightGear.amount + 1, val: rightGear.val * gridNum.v });
      });

      touches = true;
    }

    // check bottom
    const bottom = grid[gridNum.y + 1]
      ?.slice(Math.max(gridNum.x - 1, 0), gridNum.x + gridNum.v.length + 1);

    if (bottom && /[^\d^.]/.test(bottom)) {
      const xs = getMultipleIndexOf(bottom, '*').result.map((i) => i + Math.max(gridNum.x - 1, 0));

      xs.forEach((bottomX) => {
        const rightGear = gears.get(`${gridNum.y + 1}-${bottomX}`) ?? { amount: 0, val: 1 };
        gears.set(`${gridNum.y + 1}-${bottomX}`, { amount: rightGear.amount + 1, val: rightGear.val * gridNum.v });
      });

      touches = true;
    }

    return touches;
  }

  solve(input: string) {
    let y = 0;
    const numbersOnGrid = [];

    const lines = input.split('\n');

    for (const line of lines) {
      let x = 0;

      line.split(/\D/g).forEach((entry) => {
        if (isNum(entry)) {
          numbersOnGrid.push({ v: entry, x, y });
        }

        if (entry.length) {
          x += 1;
        }

        x += entry.length > 0 ? entry.length : 1;
      });

      y += 1;
    }

    const gears = new Map<string, number>();

    // Check if numbers touch special character
    const untouched = numbersOnGrid
      .filter((gridNum) => this.touchesSpecialCharacter(gridNum, lines, gears));

    this.a = untouched.reduce((partialSum, a) => partialSum + parseInt(a.v, 10), 0);

    this.b = Array.from(gears.values())
      .filter((gear) => gear['amount'] === 2)
      .map((gear) => gear['val'])
      .reduce((partialSum, a) => partialSum + a, 0);
  }
}
