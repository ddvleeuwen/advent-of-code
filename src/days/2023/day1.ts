import Solution from '../../model/solution.ts';
import { extractWrittenNumbers, isNum } from '../../util/functions.ts';

export default class Day1 extends Solution {
  /* ---- Day Init ---- */
  year = 2023;

  day = 1;

  example = false;
  /* ------------------ */

  solve(input: string) {
    for (const line of input.split('\n')) {
      const nums: any[] = [];

      extractWrittenNumbers(line, nums);

      const chars = line.split('');

      for (let charI = 0; charI < chars.length; charI += 1) {
        if (isNum(chars[charI])) {
          nums.push({
            i: charI,
            num: chars[charI],
            written: false,
          });
        }
      }

      nums.sort((a, b) => a.i - b.i);

      const unWrittenNums = nums.filter((num) => num.written === false);

      const firstAndLastNum = unWrittenNums.length === 1
        ? unWrittenNums[0].num + unWrittenNums[0].num
        : unWrittenNums[0].num + unWrittenNums[unWrittenNums.length - 1].num;
      const firstAndLastNumWritten = nums.length === 1
        ? nums[0].num + nums[0].num
        : nums[0].num + nums[nums.length - 1].num;

      this.a += parseInt(firstAndLastNum, 10);
      this.b += parseInt(firstAndLastNumWritten, 10);
    }
  }
}
