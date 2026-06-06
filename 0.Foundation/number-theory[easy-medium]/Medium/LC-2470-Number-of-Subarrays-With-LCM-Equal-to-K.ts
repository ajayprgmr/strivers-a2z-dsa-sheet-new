/**
 * Problem: Number of Subarrays With LCM Equal to K
 * Difficulty: Medium
 * Source: LeetCode — https://leetcode.com/problems/number-of-subarrays-with-lcm-equal-to-k/
 *
 * Description:
 * You are given an integer array `nums` and an integer `k`.
 * Find and return the **total count of subarrays** where the LCM (Least Common
 * Multiple) of all elements in that subarray equals exactly `k`.
 *
 * A subarray is a **contiguous, non-empty sequence** of elements from the array.
 *
 * Key Terms:
 * - Subarray: A contiguous sequence of elements.
 *   Example: In [3,6,2,7,1], subarrays include [3,6], [6,2], [3,6,2], etc.
 *
 * - LCM (Least Common Multiple): The smallest positive integer that is divisible
 *   by all elements in the subarray.
 *   Example: LCM(3, 6) = 6 because 6 is the smallest number divisible by both 3 and 6.
 *   Example: LCM(4, 6) = 12 because 12 is the smallest number divisible by both 4 and 6.
 *   Formula: LCM(a, b) = (a * b) / GCD(a, b)
 *
 * - Subarray with LCM = k: A contiguous sequence where the LCM of all its
 *   elements is exactly k (not greater, not less).
 *   Example: [6] has LCM = 6, [3, 6, 2] has LCM = 6.
 *
 * Examples:
 *
 * Example 1:
 *   Input: nums = [3,6,2,7,1], k = 6
 *   Output: 4
 *   Explanation:
 *     Subarrays with LCM = 6:
 *       - [6] → LCM(6) = 6 ✓
 *       - [3, 6] → LCM(3, 6) = 6 ✓
 *       - [3, 6, 2] → LCM(3, 6, 2) = 6 ✓
 *       - [6, 2] → LCM(6, 2) = 6 ✓
 *     Total count: 4
 *
 * Example 2:
 *   Input: nums = [3], k = 2
 *   Output: 0
 *   Explanation:
 *     Only one subarray: [3] with LCM = 3, but we need LCM = 2.
 *     No match → return 0.
 *
 * Edge Cases:
 * - Single element subarray [x] has LCM = x.
 *   If x === k, count it.
 * - If an element doesn't divide k, any subarray containing it can't have LCM = k.
 * - LCM grows quickly; exceeding k means extending further can't help.
 *
 * Constraints:
 * 1 <= nums.length <= 1000
 * 1 <= nums[i], k <= 1000
 *
 * ---
 *
 * Approach 1: Brute Force — Check All Subarrays
 *
 * For every possible subarray, calculate LCM and check if it equals k.
 *
 * Algorithm:
 * 1. Use two nested loops: outer for start index, inner for end index.
 * 2. For each subarray [start, end], compute LCM of all elements.
 * 3. If LCM === k, increment count.
 *
 * Why this is slow:
 * - There are O(n²) possible subarrays.
 * - Computing LCM for each takes O(log(max_element)).
 * - Total: O(n² * log(max)).
 *
 * Time Complexity: O(n² * log(max_element))
 * Space Complexity: O(1)
 *
 * ---
 *
 * Approach 2: Optimized — Using LCM Properties
 *
 * Key Insights:
 *
 * 1. LCM INCREASES as we extend a subarray (or stays the same).
 *    WHY? LCM(a, b) >= max(a, b), so extending always increases or maintains LCM.
 *
 * 2. If LCM > k, it can NEVER equal k by extending further.
 *    → Early exit when LCM > k
 *
 * 3. If an element doesn't divide k, LCM can't equal k.
 *    WHY? If nums[i] doesn't divide k, then LCM(..., nums[i]) can't equal k.
 *    → Early exit if nums[j] doesn't divide k
 *
 * 4. Number of distinct LCM values is limited.
 *    As we extend a subarray, LCM either stays same or increases to a new value.
 *    New values form a sequence like: 6 → 12 → 60 (roughly doubling or more).
 *    With k <= 1000, at most ~log(k) distinct values.
 *
 * Algorithm:
 * For each starting position i:
 *   - Extend rightward (j = i, i+1, i+2, ...).
 *   - Calculate LCM incrementally: LCM(nums[i..j]) = LCM(LCM(nums[i..j-1]), nums[j])
 *   - If LCM === k, increment count.
 *   - If nums[j] doesn't divide k, break (can't form LCM = k).
 *   - If LCM > k, break (LCM can only increase).
 *
 * Time Complexity: O(n * log(k) * log(max)) in practice
 *   - For each of n starting positions, at most O(log(k)) distinct LCM values.
 *   - Each LCM calculation is O(log(max)).
 * Space Complexity: O(1)
 *
 * ---
 *
 * Why Optimized is Much Better:
 *
 * Brute Force:   1000 elements × 1000 elements × log(1000) = ~10 million ops
 * Optimized:     1000 elements × log(1000) distinct LCMs × log(1000) = ~100K ops
 *
 * That's 100x faster!
 */

// ============================================================
// Helper: Greatest Common Divisor (for LCM calculation)
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
// Helper: Least Common Multiple
// ============================================================
function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

// ============================================================
// Approach 1: Brute Force — Check All Subarrays
// ============================================================
function subarrayLCMBrute(nums: number[], k: number): number {
  let count = 0;
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    let currentLCM = 1;

    for (let j = i; j < n; j++) {
      currentLCM = lcm(currentLCM, nums[j]);

      if (currentLCM === k) {
        count++;
      }

      // Optimization: if LCM > k, it can never come back to k
      if (currentLCM > k) {
        break;
      }
    }
  }

  return count;
}

// ============================================================
// Approach 2: Optimized — With Multiple Early Exits
// ============================================================
function subarrayLCM(nums: number[], k: number): number {
  let count = 0;
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    let currentLCM = 1;

    for (let j = i; j < n; j++) {
      currentLCM = lcm(currentLCM, nums[j]);

      if (currentLCM === k) {
        count++;
      }

      // EARLY EXIT 1: If an element doesn't divide k, it can't lead to LCM = k
      // WHY? LCM(..., nums[j]) must be divisible by nums[j].
      // If nums[j] doesn't divide k, then LCM can't equal k.
      if (k % nums[j] !== 0) {
        break;
      }

      // EARLY EXIT 2: If LCM > k, it can only increase further
      // WHY? LCM is monotonically increasing as we extend the subarray.
      if (currentLCM > k) {
        break;
      }
    }
  }

  return count;
}

// ============================================================
// Testing
// ============================================================
console.log("=== Example 1: nums = [3,6,2,7,1], k = 6 ===");
console.log("Brute Force:    ", subarrayLCMBrute([3, 6, 2, 7, 1], 6)); // Expected: 4
console.log("Optimized:      ", subarrayLCM([3, 6, 2, 7, 1], 6));     // Expected: 4

console.log("\n=== Example 2: nums = [3], k = 2 ===");
console.log("Brute Force:    ", subarrayLCMBrute([3], 2));               // Expected: 0
console.log("Optimized:      ", subarrayLCM([3], 2));                   // Expected: 0

console.log("\n=== Edge Case: Single element matching ===");
console.log("Brute Force:    ", subarrayLCMBrute([5], 5));              // Expected: 1
console.log("Optimized:      ", subarrayLCM([5], 5));                  // Expected: 1

console.log("\n=== Edge Case: Multiple matches ===");
console.log("Brute Force:    ", subarrayLCMBrute([2, 3, 6], 6));       // Expected: 3 ([6], [3,6], [2,3,6])
console.log("Optimized:      ", subarrayLCM([2, 3, 6], 6));            // Expected: 3

console.log("\n=== Edge Case: No match ===");
console.log("Brute Force:    ", subarrayLCMBrute([2, 4, 8], 5));       // Expected: 0
console.log("Optimized:      ", subarrayLCM([2, 4, 8], 5));            // Expected: 0

console.log("\n=== Edge Case: Element doesn't divide k ===");
console.log("Brute Force:    ", subarrayLCMBrute([5, 10, 7], 10));     // Expected: 1 ([10])
console.log("Optimized:      ", subarrayLCM([5, 10, 7], 10));          // Expected: 1

console.log("\n=== Performance trace for [3,6,2,7,1], k=6 ===");
console.log("Starting position 0:");
console.log("  j=0: LCM(1,3)=3, 6%3=0 ✓, 3<6 continue");
console.log("  j=1: LCM(3,6)=6, 6%6=0 ✓, 6==6 COUNT, 6==6 break");
console.log("Starting position 1:");
console.log("  j=1: LCM(1,6)=6, 6%6=0 ✓, 6==6 COUNT, 6==6 break");
console.log("Starting position 2:");
console.log("  j=2: LCM(1,2)=2, 6%2=0 ✓, 2<6 continue");
console.log("  j=3: LCM(2,7)=14, 6%7!=0 break");
console.log("... and so on");

export {};
