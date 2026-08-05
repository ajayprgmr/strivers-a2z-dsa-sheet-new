/*
QUESTION:-
Given an array nums, return true if the array was originally sorted in
non-decreasing order, then rotated some number of positions (including zero).
Otherwise, return false. There may be duplicates in the original array.

Example 1:
Input: nums = [3,4,5,1,2]
Output: true
Explanation: [1,2,3,4,5] is the original sorted array, rotated by 3 positions.

Example 2:
Input: nums = [2,1,3,4]
Output: false
Explanation: There is no sorted array once rotated that can make nums.
*/

/*
APPROACH:-
Compare every neighbouring pair (a, b). In a sorted-then-rotated array the
"drop" case a > b can happen at most once. Treat the array as circular, so the
last element and the first element are also a pair.

-> If there are zero drops, the array is already sorted -> true.
-> If there is exactly one drop, it is valid only when the rotation wraps
   cleanly, i.e. the last element is <= the first element (nums[n-1] <= nums[0]).
-> Otherwise -> false.

Counting the wrap-around pair directly lets a single check cover both cases.
*/

// CODE:-
function check(nums: number[]): boolean {
  const n = nums.length;
  let drops = 0;

  for (let i = 0; i < n; i++) {
    // Circular comparison: pair the last element with the first.
    if (nums[i] > nums[(i + 1) % n]) {
      drops++;
    }
  }

  return drops <= 1;
}

// TIME COMPLEXITY = O(N)
// SPACE COMPLEXITY = O(1)

// Test cases:
console.log(check([3, 4, 5, 1, 2])); // true
console.log(check([2, 1, 3, 4])); // false
console.log(check([1, 2, 3, 4, 5])); // true  (already sorted, zero rotation)
console.log(check([1, 1, 1])); // true  (duplicates)
console.log(check([2, 1])); // true

export {};
