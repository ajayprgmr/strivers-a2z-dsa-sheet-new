/**
 * Problem: Number of Subarrays With GCD Equal to K
 * Difficulty: Medium
 * Source: LeetCode — https://leetcode.com/problems/number-of-subarrays-with-gcd-equal-to-k/
 *
 * Description:
 * You are given an integer array `nums` and an integer `k`.
 * Find and return the **total count of subarrays** where the GCD (Greatest Common
 * Divisor) of all elements in that subarray equals exactly `k`.
 *
 * A subarray is a **contiguous, non-empty sequence** of elements from the array.
 *
 * Key Terms:
 * - Subarray: A contiguous sequence of elements.
 *   Example: In [9,3,1,2,6,3], subarrays include [9,3], [3,1,2], [1,2,6,3], etc.
 *
 * - GCD (Greatest Common Divisor): The largest positive integer that divides
 *   all elements in the subarray evenly (with no remainder).
 *   Example: GCD(9, 3, 6) = 3 because 3 divides 9, 3, and 6.
 *   Example: GCD(12, 8) = 4 because 4 divides 12 and 8.
 *
 * - Subarray with GCD = k: A contiguous sequence where the GCD of all its
 *   elements is exactly k (not greater, not less).
 *   Example: [9, 3] has GCD = 3, [3, 6, 3] has GCD = 3.
 *
 * Examples:
 *
 * Example 1:
 *   Input: nums = [9,3,1,2,6,3], k = 3
 *   Output: 4
 *   Explanation:
 *     Subarrays with GCD = 3:
 *       - [9, 3] → GCD(9, 3) = 3 ✓
 *       - [3] (first) → GCD(3) = 3 ✓
 *       - [3] (second) → GCD(3) = 3 ✓
 *       - [6, 3] → GCD(6, 3) = 3 ✓
 *     Total count: 4
 *
 * Example 2:
 *   Input: nums = [4], k = 7
 *   Output: 0
 *   Explanation:
 *     Only one subarray: [4] with GCD = 4, but we need GCD = 7.
 *     No match → return 0.
 *
 * Edge Cases:
 * - Single element subarray [x] has GCD = x.
 * - If no element divisible by k, result is 0.
 * - All subarrays might have GCD < k.
 *
 * Constraints:
 * 1 <= nums.length <= 1000
 * 1 <= nums[i], k <= 10^9
 *
 * ---
 *
 * Approach 1: Brute Force — Check All Subarrays
 *
 * For every possible subarray, calculate GCD and check if it equals k.
 *
 * Time Complexity: O(n² * log(max_element))
 * Space Complexity: O(1)
 *
 * ---
 *
 * Approach 2: Optimized — Early Exit Using GCD Property
 *
 * Key Insight: GCD only decreases or stays same as we extend a subarray.
 * If GCD < k, it can NEVER equal k by extending further.
 * Break early to save iterations.
 *
 * Also, distinct GCD values ≤ log(max_element) because GCD roughly halves:
 * 36 → 12 → 4 → 2 → 1
 *
 * Time Complexity: O(n * n * log(max)) worst case, much faster in practice
 * Space Complexity: O(1)
 */

// ============================================================
// Helper: Greatest Common Divisor
// ============================================================
function gcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// ============================================================
// Approach 1: Brute Force
// ============================================================
function subarrayGCDBrute(nums: number[], k: number): number {
  let count = 0;
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    let currentGCD = 0;

    for (let j = i; j < n; j++) {
      currentGCD = gcd(currentGCD, nums[j]);

      if (currentGCD === k) {
        count++;
      }
    }
  }

  return count;
}

// ============================================================
// Approach 2: Optimized — With Early Exit
// ============================================================
function subarrayGCD(nums: number[], k: number): number {
  let count = 0;
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    let currentGCD = 0;

    for (let j = i; j < n; j++) {
      currentGCD = gcd(currentGCD, nums[j]);

      if (currentGCD === k) {
        count++;
      }

      // EARLY EXIT: GCD can only decrease. If < k, break.
      if (currentGCD < k) {
        break;
      }
    }
  }

  return count;
}

// ============================================================
// Testing
// ============================================================
console.log("=== Example 1: nums = [9,3,1,2,6,3], k = 3 ===");
console.log("Brute:    ", subarrayGCDBrute([9, 3, 1, 2, 6, 3], 3)); // Expected: 4
console.log("Optimized:", subarrayGCD([9, 3, 1, 2, 6, 3], 3));     // Expected: 4

console.log("\n=== Example 2: nums = [4], k = 7 ===");
console.log("Brute:    ", subarrayGCDBrute([4], 7));               // Expected: 0
console.log("Optimized:", subarrayGCD([4], 7));                   // Expected: 0

console.log("\n=== Single element matching ===");
console.log("Brute:    ", subarrayGCDBrute([5], 5));              // Expected: 1
console.log("Optimized:", subarrayGCD([5], 5));                  // Expected: 1

console.log("\n=== All divisible by k ===");
console.log("Brute:    ", subarrayGCDBrute([6, 12, 18], 6));     // Expected: 3
console.log("Optimized:", subarrayGCD([6, 12, 18], 6));          // Expected: 3

console.log("\n=== No match ===");
console.log("Brute:    ", subarrayGCDBrute([2, 4, 6], 5));       // Expected: 0
console.log("Optimized:", subarrayGCD([2, 4, 6], 5));            // Expected: 0

export {};
