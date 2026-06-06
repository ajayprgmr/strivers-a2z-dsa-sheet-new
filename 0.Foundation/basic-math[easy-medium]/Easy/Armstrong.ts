/**
 * An Armstrong number, also known as a narcissistic number, is a number that is equal to the sum of its own digits raised to the power of the number of digits.
 * E.g. abc...z = a^n + b^n + c^n + ... + z^n
 * GFG: https://www.geeksforgeeks.org/problems/armstrong-numbers2727/1
 */
function armStrongNumber(n: number): boolean {
  const num_length: number = String(n).length;

  let res: number = 0;
  let num: number = n;
  while (num > 0) {
    const d: number = num % 10;
    res += Math.pow(d, num_length);
    num = Math.floor(num / 10);
  }
  return n === res;
}

console.log(armStrongNumber(153));
