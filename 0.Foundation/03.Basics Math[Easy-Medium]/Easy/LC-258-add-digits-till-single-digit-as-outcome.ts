/*
258. Add Digits (LeetCode - Easy)

Problem:
Given a non-negative integer `num`, keep adding its digits until only one digit remains.

Example:
38 → 3 + 8 = 11 → 1 + 1 = 2

Approach 1: Recursive Digit Sum
- First, calculate the sum of all digits.
- If the sum is already a single digit, return it.
- Otherwise, repeat the same process recursively.

Time Complexity: O(log n)
- Each digit-sum operation visits every digit once.

Space Complexity: O(log log n)
- Due to recursive calls.
- In practice, this is almost O(1), because the number becomes very small quickly.
*/

function digitsSumCummulator(num: number): number {
  let result: number = 0;
  let tempNum: number = num;

  while (tempNum > 0) {
    const d = tempNum % 10;
    result += d;
    tempNum = Math.floor(tempNum / 10);
  }

  return result;
}

function addDigitsRecursive(num: number): number {
  const sumReturn = digitsSumCummulator(num);

  if (sumReturn < 10) return sumReturn;

  return addDigitsRecursive(sumReturn);
}

// =============================================

/*
Approach 2: Digital Root Formula

Instead of repeatedly summing digits, we can directly calculate the final
single-digit result using the digital root formula.

Formula:
- If num === 0, answer is 0
- Otherwise, answer is 1 + ((num - 1) % 9)

Why this works:
- In base 10, every power of 10 leaves remainder 1 when divided by 9.
  Example:
  10 % 9 = 1
  100 % 9 = 1
  1000 % 9 = 1

So a number and the sum of its digits have the same remainder modulo 9.

Example:
385 = 3 × 100 + 8 × 10 + 5
Since 100 ≡ 1 (mod 9) and 10 ≡ 1 (mod 9),
385 ≡ 3 + 8 + 5 ≡ 16 ≡ 7 (mod 9)

The only edge case is multiples of 9:
- 9 % 9 = 0, but the digital root should be 9
- 18 % 9 = 0, but the digital root should be 9

Using `1 + ((num - 1) % 9)` fixes this cleanly.

Time Complexity: O(1)
Space Complexity: O(1)
*/

// =============================================

function addDigits(num: number): number {
  if (num === 0) return 0;

  return 1 + ((num - 1) % 9);
}

console.log(addDigitsRecursive(38)); // 2
console.log(addDigitsRecursive(0));  // 0

console.log(addDigits(38));          // 2
console.log(addDigits(0));           // 0
