/**
 * Problem: The kth Factor of n
 * Difficulty: Medium
 * Source: LeetCode — https://leetcode.com/problems/the-kth-factor-of-n/
 *
 * Description:
 * You are given two positive integers `n` and `k`.
 * A **factor** (also called a divisor) of an integer `n` is any integer `i`
 * such that `n % i === 0` — meaning `i` divides `n` evenly with no remainder.
 *
 * Your task is to:
 * 1. Find ALL factors of `n`.
 * 2. Sort them in ascending order.
 * 3. Return the k-th factor (1-indexed) from that sorted list.
 * 4. If `n` has fewer than `k` factors, return `-1`.
 *
 * Key Terms:
 * - Factor/Divisor: A number `i` that divides `n` with zero remainder.
 *   Example: Factors of 12 are [1, 2, 3, 4, 6, 12] because 12 % 1 === 0, 12 % 2 === 0, etc.
 * - k-th (1-indexed): The k-th element starting count from 1, not 0.
 *   Example: In [1, 2, 3, 4, 6, 12], the 3rd factor (k=3) is 3.
 * - Ascending order: Smallest to largest. Iterating from 1 to n naturally gives this.
 *
 * Examples:
 *
 * Example 1:
 *   Input: n = 12, k = 3
 *   Output: 3
 *   Explanation:
 *     i=1  → 12 % 1 = 0  ✓ factors = [1]         count = 1
 *     i=2  → 12 % 2 = 0  ✓ factors = [1,2]       count = 2
 *     i=3  → 12 % 3 = 0  ✓ factors = [1,2,3]     count = 3 → k reached! return 3
 *
 * Example 2:
 *   Input: n = 7, k = 2
 *   Output: 7
 *   Explanation:
 *     7 is prime, so its only factors are [1, 7].
 *     The 2nd factor is 7.
 *
 * Example 3:
 *   Input: n = 4, k = 4
 *   Output: -1
 *   Explanation:
 *     Factors of 4 are [1, 2, 4] — only 3 factors exist.
 *     k=4 exceeds the count, so return -1.
 *
 * Edge Cases:
 * - n = 1, k = 1 → Only factor is [1], return 1.
 * - n = 1, k = 2 → Only 1 factor exists, return -1.
 * - k = 1 always returns 1 (since 1 is always the smallest factor of any positive integer).
 *
 * Constraints:
 * 1 <= k <= n <= 1000
 *
 * ---
 *
 * Approach 1: Brute Force — Linear Scan
 *
 * Iterate from 1 to n. Each time we find a factor, decrement k.
 * When k hits 0, we've found our answer. No need to store all factors.
 *
 * Why this works:
 * - Iterating 1 to n guarantees ascending order automatically.
 * - We don't need to collect and sort — just count as we go.
 *
 * Time Complexity: O(n) — we check every number from 1 to n.
 * Space Complexity: O(1) — no extra storage, just a counter.
 *
 * ---
 *
 * Approach 2: Optimized — Using √n Property
 *
 * Every factor `i` of `n` that is ≤ √n has a complementary factor `n / i` that is ≥ √n.
 * Example: For n = 12, factor pair (3, 4) because 3 × 4 = 12.
 *
 * So we only need to iterate from 1 to √n:
 * - First pass (1 to √n): count small factors in ascending order.
 * - If k is not exhausted, second pass (√n down to 1): count large factors (n/i) in ascending order.
 *
 * Why iterate the second pass in reverse?
 *   Small factors [1, 2, 3] are ascending. Their complements [12, 6, 4] are descending.
 *   To continue in ascending order after the small factors, we traverse complements in reverse.
 *
 * Special care: if n is a perfect square, √n appears in both passes — skip the duplicate.
 *
 * Time Complexity: O(√n) — only iterate up to √n twice.
 * Space Complexity: O(1) — no extra storage.
 */

// ============================================================
// Approach 1: Brute Force — Linear Scan
// ============================================================
function kthFactorBruteForce(n: number, k: number): number {
  let count = 0;

  for (let i = 1; i <= n; i++) {
    // Check if i is a factor of n
    if (n % i === 0) {
      count++;
      // If this is the k-th factor, return immediately
      if (count === k) {
        return i;
      }
    }
  }

  // If we finish the loop without finding k factors, return -1
  return -1;
}

// ============================================================
// Approach 2: Optimized — √n Approach
// ============================================================
function kthFactor(n: number, k: number): number {
  const sqrtN = Math.floor(Math.sqrt(n));

  // First pass: check small factors from 1 to √n (ascending)
  for (let i = 1; i <= sqrtN; i++) {
    if (n % i === 0) {
      k--;
      if (k === 0) return i;
    }
  }

  // Second pass: check large factors (complements) in ascending order
  // We go from √n down to 1, picking up n/i which goes ascending
  for (let i = sqrtN; i >= 1; i--) {
    // Skip if i * i === n to avoid counting √n twice
    if (i * i === n) continue;

    if (n % i === 0) {
      k--;
      if (k === 0) return n / i;
    }
  }

  return -1;
}

// ============================================================
// Testing
// ============================================================
console.log(kthFactorBruteForce(12, 3)); // 3
console.log(kthFactorBruteForce(7, 2));  // 7
console.log(kthFactorBruteForce(4, 4));  // -1

console.log(kthFactor(12, 3)); // 3
console.log(kthFactor(7, 2));  // 7
console.log(kthFactor(4, 4));  // -1
