/**
 * Problem: 1447. Simplified Fractions
 * Difficulty: Medium
 * Source: LeetCode — https://leetcode.com/problems/simplified-fractions/
 *
 * Description:
 * Given an integer n, return a list of all simplified fractions between 0 and 1
 * (exclusive) such that the denominator is less-than-or-equal-to n.
 * A simplified fraction is one where the numerator and denominator share no
 * common factor other than 1 (i.e., GCD(numerator, denominator) === 1).
 *
 * Key Terms:
 * - Simplified Fraction: A fraction a/b where GCD(a, b) = 1, meaning it cannot
 *   be reduced further. Example: 1/3 is simplified, but 2/4 is not (reduces to 1/2).
 * - GCD (Greatest Common Divisor): The largest number that evenly divides both a and b.
 *   Computed using the Euclidean algorithm: repeatedly replace (a, b) with (b, a % b)
 *   until b === 0. Example: GCD(12, 8) → GCD(8, 4) → GCD(4, 0) → 4.
 * - Coprime: Two numbers are coprime if their GCD is 1. Example: 3 and 7 are coprime.
 * - Exclusive (0, 1): The fraction must be strictly greater than 0 and strictly less
 *   than 1, so numerator >= 1 and numerator < denominator.
 *
 * Examples:
 * Input: n = 4
 * Output: ["1/2", "1/3", "2/3", "1/4", "3/4"]
 * Explanation:
 *   Denominator 2: 1/2 → GCD(1,2)=1 ✓
 *   Denominator 3: 1/3 → GCD(1,3)=1 ✓, 2/3 → GCD(2,3)=1 ✓
 *   Denominator 4: 1/4 → GCD(1,4)=1 ✓, 2/4 → GCD(2,4)=2 ✗ (skip), 3/4 → GCD(3,4)=1 ✓
 *
 * Input: n = 3
 * Output: ["1/2", "1/3", "2/3"]
 *
 * Input: n = 1
 * Output: []
 * Explanation: No valid denominator exists (must be >= 2 for fraction to be between 0 and 1).
 *
 * Approach: Brute Force with GCD Check
 * For every possible denominator (2 to n), iterate through every possible numerator
 * (1 to denominator-1). If GCD(numerator, denominator) === 1, the fraction is already
 * in its simplest form — add it to the result. The GCD check is the key insight:
 * it's the mathematical definition of "cannot be reduced further".
 *
 * Time Complexity: O(n² × log n) — ~n²/2 pairs to check, each GCD call is O(log n)
 * Space Complexity: O(1) extra — excluding the output array, only loop variables and GCD computation
 */

// Helper: Euclidean algorithm to compute GCD
// It works by repeatedly replacing the larger number with the remainder of dividing
// the two numbers, until the remainder is 0. The last non-zero value is the GCD.
function gcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function simplifiedFractions(n: number): string[] {
  const result: string[] = [];

  // Denominator ranges from 2 to n (denominator of 1 means fraction >= 1, which is out of range)
  for (let denominator = 2; denominator <= n; denominator++) {
    // Numerator ranges from 1 to denominator-1 (ensures 0 < fraction < 1)
    for (let numerator = 1; numerator < denominator; numerator++) {
      // Only include the fraction if numerator and denominator are coprime
      // This guarantees the fraction is in its simplest form
      if (gcd(numerator, denominator) === 1) {
        result.push(`${numerator}/${denominator}`);
      }
    }
  }

  return result;
}

// --- Test Cases ---
console.log(simplifiedFractions(4)); // ["1/2", "1/3", "2/3", "1/4", "3/4"]
console.log(simplifiedFractions(3)); // ["1/2", "1/3", "2/3"]
console.log(simplifiedFractions(1)); // []
console.log(simplifiedFractions(2)); // ["1/2"]
console.log(simplifiedFractions(6)); // ["1/2", "1/3", "2/3", "1/4", "3/4", "1/5", "2/5", "3/5", "4/5", "1/6", "5/6"]

export {};
