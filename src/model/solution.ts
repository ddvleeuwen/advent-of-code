export default abstract class Solution {
    abstract year: number

    abstract day: number

    a: number = 0;

    b: number = 0;

    example: boolean = false;

    abstract solve(input: string): void
}
