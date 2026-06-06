/**
 * Problem: Count Primes
 * Difficulty: Medium
 * Source: LeetCode — https://leetcode.com/problems/count-primes/
 *
 * Description:
 * Given an integer `n`, return the number of prime numbers strictly less than `n`.
 *
 * A prime number is a natural number greater than 1 that has no positive divisors
 * other than 1 and itself.
 *
 * Examples:
 *
 * Example 1:
 *   Input: n = 10
 *   Output: 4
 *   Explanation: Primes less than 10 are [2, 3, 5, 7] → count = 4
 *
 * Example 2:
 *   Input: n = 0
 *   Output: 0
 *
 * Example 3:
 *   Input: n = 1
 *   Output: 0
 *
 * Constraints:
 * 0 <= n <= 5 * 10^6
 *
 * ---
 *
 * Approach 1: Brute Force — Check Each Number
 *
 * For every number i from 2 to n-1, check if it's prime by trial division up to √i.
 *
 * Time Complexity:  O(n * √n)
 * Space Complexity: O(1)
 *
 * Too slow for n up to 5 * 10^6.
 */

// ============================================================
// Approach 1: Brute Force
// ============================================================
function countPrimesBrute(n: number): number {
  const isPrime = (num: number): boolean => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  let count = 0;
  for (let i = 2; i < n; i++) {
    if (isPrime(i)) count++;
  }
  return count;
}



/*
 *
 * Approach 2: Sieve of Eratosthenes (Optimal)
 *
 * Classic algorithm to find all primes up to n efficiently.
 *
 * How it works:
 * 1. Create a boolean array `isComposite` of size n, initialized to false.
 *    - false = "assumed prime", true = "marked composite"
 * 2. Start from i = 2. For each i that is still prime (isComposite[i] === false):
 *    - Mark all multiples of i starting from i*i as composite.
 *    - Why start at i*i? All smaller multiples (2i, 3i, ...) were already marked
 *      by earlier primes.
 * 3. Stop the outer loop at √n — any composite number ≤ n must have a factor ≤ √n.
 * 4. Count all indices from 2 to n-1 where isComposite[i] === false.
 *
 * Example walkthrough for n = 10:
 *   Initial: [_, _, F, F, F, F, F, F, F, F]  (index 0,1 ignored)
 *   i=2: mark 4,6,8 → [_, _, F, F, T, F, T, F, T, F]
 *   i=3: mark 9     → [_, _, F, F, T, F, T, F, T, T]
 *   Count false from index 2..9 → indices 2,3,5,7 → 4 primes ✓
 *
 * Time Complexity:  O(n log log n) — near linear, very fast in practice
 * Space Complexity: O(n)
 */

// ============================================================
// Approach 2: Sieve of Eratosthenes
// ============================================================
function countPrimes(n: number): number {
  if (n < 2) return 0;

  const isComposite = new Uint8Array(n); // 0 = prime, 1 = composite
  console.log(isComposite)

  for (let i = 2; i * i < n; i++) {
    if (isComposite[i] === 0) {
      for (let j = i * i; j < n; j += i) {
        isComposite[j] = 1;
      }
    }
  }

  console.log('checking', isComposite)

  let count = 0;
  for (let i = 2; i < n; i++) {
    if (isComposite[i] === 0) count++;
  }
  return count;
}



// ============================================================
// Testing
// ============================================================

const newPer = performance.now();
console.log(countPrimes(30));
console.log('optimal performance',  performance.now() - newPer);