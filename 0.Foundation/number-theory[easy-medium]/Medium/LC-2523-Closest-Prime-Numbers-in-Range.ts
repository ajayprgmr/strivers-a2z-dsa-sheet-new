/**
 * Problem: Closest Prime Numbers in Range
 * Difficulty: Medium
 * Source: LeetCode — https://leetcode.com/problems/closest-prime-numbers-in-range/
 *
 * Description:
 * Given two positive integers `left` and `right`, find a pair of prime numbers
 * [num1, num2] such that:
 *   - left <= num1 < num2 <= right
 *   - Both are prime
 *   - num2 - num1 is the smallest possible gap among all valid prime pairs in the range
 *
 * If multiple pairs share the same minimum gap, return the one with the smallest num1.
 * If fewer than 2 primes exist in the range, return [-1, -1].
 *
 * Key Terms:
 * - Prime number: A number > 1 with no divisors other than 1 and itself.
 *   Example: 11 is prime (divisible only by 1 and 11). 12 is not (divisible by 2, 3, 4, 6).
 * - Closest pair: The pair with the minimum difference (num2 - num1).
 *   Example: Among pairs [11,13] and [17,19], both have gap 2 — return [11,13] (smaller num1).
 * - Twin primes: Pairs of primes with gap exactly 2 (e.g., [11,13], [17,19], [29,31]).
 *   If any twin prime pair exists in range, it's guaranteed to be the answer (gap can't be 1
 *   since two consecutive integers can't both be prime, except [2,3]).
 *
 * Examples:
 *
 * Example 1:
 *   Input: left = 10, right = 19
 *   Output: [11, 13]
 *   Explanation:
 *     Primes in [10..19]: 11, 13, 17, 19
 *     Pairs and gaps: [11,13]=2, [13,17]=4, [17,19]=2
 *     Minimum gap = 2, first pair with that gap = [11,13] ✓
 *
 * Example 2:
 *   Input: left = 4, right = 6
 *   Output: [-1, -1]
 *   Explanation:
 *     Primes in [4..6]: only 5
 *     Need at least 2 primes — return [-1, -1]
 *
 * Edge Cases:
 * - left = 1: 1 is not prime, so start checking from 2.
 * - left = right: Only one number in range, can't form a pair → [-1, -1].
 * - left = 2, right = 3: [2, 3] is a valid pair with gap 1 (the only case gap = 1 is possible).
 *
 * Constraints:
 * 1 <= left <= right <= 10^6
 *
 * ---
 *
 * Approach 1: Brute Force — Trial Division per Number
 *
 * For each number in [left..right], check if it's prime using trial division up to √num.
 * Collect all primes, then scan adjacent pairs for the minimum gap.
 *
 * Time Complexity:  O(n * √right) — n = right - left + 1, each primality check costs √right
 * Space Complexity: O(n) — storing all primes in the range
 */

// ============================================================
// Approach 1: Brute Force — Trial Division
// ============================================================
function closestPrimesBrute(left: number, right: number): number[] {
  const isPrime = (num: number): boolean => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  let ans = [-1, -1];
  let minGap = Infinity;
  let prevPrime = -1;

  for (let num = left; num <= right; num++) {
    if (isPrime(num)) {
      if (prevPrime !== -1 && num - prevPrime < minGap) {
        minGap = num - prevPrime;
        ans = [prevPrime, num];
      }
      prevPrime = num;
    }
  }

  return ans;
}




/*
 * Approach 2: Sieve of Eratosthenes (Optimal)
 *
 * Pre-compute all primes up to `right` using the Sieve, then scan [left..right] for
 * adjacent prime pairs with the minimum gap.
 *
 * Why sieve is better here:
 * - Sieve marks all composites in O(right * log log right) upfront.
 * - Each primality lookup is then O(1) — just check the boolean array.
 * - Much faster than re-running trial division for every number in range.
 *
 * Step-by-step:
 * 1. Build sieve of size right + 1.
 * 2. Walk from left to right, tracking the previous prime seen (prevPrime).
 * 3. For each new prime found, compute gap = current - prevPrime.
 * 4. If gap < minGap, update answer and minGap.
 *
 * Time Complexity:  O(right * log log right) — dominated by sieve construction
 * Space Complexity: O(right) — sieve array of size right + 1
 */

// ============================================================
// Approach 2: Sieve of Eratosthenes
// ============================================================
function closestPrimes(left: number, right: number): number[] {
  // Build sieve up to `right`
  const isComposite = new Uint8Array(right + 1); // 0 = prime, 1 = composite
  isComposite[0] = 1;
  isComposite[1] = 1;

  for (let i = 2; i * i <= right; i++) { // O(right)
    if (isComposite[i] === 0) {
      for (let j = i * i; j <= right; j += i) { 
        isComposite[j] = 1;
      }
    }
  }

  let ans = [-1, -1];
  let minGap = Infinity;
  let prevPrime = -1;

  for (let num = left; num <= right; num++) {
    if (isComposite[num] === 0) {
      if (prevPrime !== -1 && num - prevPrime < minGap) {
        minGap = num - prevPrime;
        ans = [prevPrime, num];
        // Early exit: gap of 1 or 2 is the minimum possible (twin primes)
        if (minGap <= 2) break;
      }
      prevPrime = num;
    }
  }

  return ans;
}

// ============================================================
// Testing
// ============================================================
console.log(closestPrimesBrute(10, 19)); // [11, 13]
console.log(closestPrimesBrute(4, 6));   // [-1, -1]
console.log(closestPrimesBrute(2, 3));   // [2, 3]

console.log(closestPrimes(10, 19)); // [11, 13]
console.log(closestPrimes(4, 6));   // [-1, -1]
console.log(closestPrimes(2, 3));   // [2, 3]
