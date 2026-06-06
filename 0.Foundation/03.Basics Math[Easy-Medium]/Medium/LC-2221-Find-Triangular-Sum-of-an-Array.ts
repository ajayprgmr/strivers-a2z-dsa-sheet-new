/**
 * Problem: 2221. Find Triangular Sum of an Array
 * Difficulty: Medium
 * Source: LeetCode — https://leetcode.com/problems/find-triangular-sum-of-an-array/
 *
 * Description:
 * You are given a 0-indexed integer array `nums`, where each element is a single digit (0–9).
 * You must repeatedly reduce the array until only one element remains — that element is the
 * "triangular sum".
 *
 * In each reduction step, you build a new array of length n-1 where each element is the sum
 * of two adjacent elements from the current array, taken modulo 10. You keep doing this
 * until only one element is left.
 *
 * Think of it like building an upside-down Pascal's Triangle, but every value is mod 10.
 *
 * Key Terms:
 * - Triangular Sum: The single value that remains after repeatedly combining adjacent pairs.
 *   Similar to how Pascal's Triangle works — each row is derived from the one above it.
 *   Example: [1, 2, 3] → [(1+2)%10, (2+3)%10] = [3, 5] → [(3+5)%10] = [8]
 *
 * - Modulo 10 (% 10): Keep only the ones digit of a sum.
 *   Example: 7 + 8 = 15, but 15 % 10 = 5. This ensures every value stays in range 0–9.
 *
 * - 0-indexed: The array starts at index 0. When we say "for each index i where 0 <= i < n-1",
 *   we pair nums[0] with nums[1], nums[1] with nums[2], etc.
 *
 * Examples:
 *
 * Example 1:
 * Input: nums = [1, 2, 3, 4, 5]
 * Output: 8
 * Explanation:
 *   Step 1: [(1+2)%10, (2+3)%10, (3+4)%10, (4+5)%10] = [3, 5, 7, 9]
 *   Step 2: [(3+5)%10, (5+7)%10, (7+9)%10]             = [8, 2, 6]
 *   Step 3: [(8+2)%10, (2+6)%10]                         = [0, 8]
 *   Step 4: [(0+8)%10]                                    = [8]
 *   Only one element remains → return 8.
 *
 * Example 2:
 * Input: nums = [5]
 * Output: 5
 * Explanation: Already one element, return it directly.
 *
 * Edge Cases:
 * - Single element array → return that element immediately.
 * - All zeros → every reduction yields zeros, answer is 0.
 * - Sums that overflow single digit (e.g., 9 + 9 = 18 → 8 after mod 10).
 *
 * Approach: In-Place Simulation
 * Instead of creating a new array each time, we can modify `nums` in-place.
 * In each pass, we iterate from left to right, replacing nums[i] with (nums[i] + nums[i+1]) % 10.
 * After each pass, the "effective" length of the array shrinks by 1.
 * We repeat until the effective length is 1.
 *
 * This avoids allocating new arrays on every step.
 *
 * Time Complexity: O(n²) — The outer loop runs n-1 times, and the inner loop runs
 *   n-1, n-2, ..., 1 iterations respectively. Total = n*(n-1)/2 = O(n²).
 * Space Complexity: O(1) — We modify the array in-place, no extra space needed.
 */

// Approach 1: In-Place Simulation (Optimized — no extra arrays)
function triangularSum(nums: number[]): number {
  // effectiveLength tracks how many elements are still "active"
  let effectiveLength = nums.length;

  // Keep reducing until only one element remains
  while (effectiveLength > 1) {
    // For each adjacent pair, compute their sum mod 10
    for (let i = 0; i < effectiveLength - 1; i++) {
      nums[i] = (nums[i] + nums[i + 1]) % 10;
    }
    // After one pass, the last element is no longer needed
    effectiveLength--;
  }

  // The triangular sum is now at index 0
  return nums[0];
}

// =====================================================================
// Approach 2: New Array Each Step (Matches the problem description exactly)
// This is closer to what the problem statement describes — easier to understand
// but uses more memory.
//
// Time Complexity: O(n²) — same as above
// Space Complexity: O(n) — a new array is created on each step
// =====================================================================
function triangularSumWithNewArray(nums: number[]): number {
  // Repeat until only one element is left
  while (nums.length > 1) {
    // Build a new array of length n-1
    const newNums: number[] = [];

    for (let i = 0; i < nums.length - 1; i++) {
      // Sum adjacent elements and take mod 10 to keep it a single digit
      newNums.push((nums[i] + nums[i + 1]) % 10);
    }

    // Replace nums with the newly computed shorter array
    nums = newNums;
  }

  // The last remaining element is the triangular sum
  return nums[0];
}

// --- Test Cases ---
console.log(triangularSum([1, 2, 3, 4, 5])); // Expected: 8
console.log(triangularSum([5]));               // Expected: 5
console.log(triangularSum([0, 0, 0]));         // Expected: 0
console.log(triangularSum([9, 9]));            // Expected: 8  → (9+9)%10 = 18%10 = 8

console.log("--- Approach 2 ---");
console.log(triangularSumWithNewArray([1, 2, 3, 4, 5])); // Expected: 8
console.log(triangularSumWithNewArray([5]));               // Expected: 5
