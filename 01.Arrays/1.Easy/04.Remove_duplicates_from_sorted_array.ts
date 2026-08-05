/*
QUESTION:-
Given an integer array nums sorted in non-decreasing order, remove the
duplicates in-place such that each unique element appears only once. The
relative order of the elements should be kept the same. Return the number of
unique elements k, with the first k elements of nums holding those unique
values (the remaining elements are not important).

Example 1:
Input: nums = [1,1,2]
Output: 2, nums = [1,2,_]

Example 2:
Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
*/

/*
APPROACH:-
Two pointers on the same array. `k` marks the last slot already filled with a
unique value; everything at indices 0..k is unique and sorted. `j` scans ahead.

-> Whenever nums[j] differs from nums[k], it is a new unique value, so advance k
   and copy nums[j] into nums[k].
-> Because the array is sorted, equal values are always adjacent, so this single
   pass collects exactly the distinct elements in order.
-> The count of unique elements is k + 1 (0-based index -> length).
*/

// CODE:-
function removeDuplicates(nums: number[]): number {
  if (nums.length === 0) return 0;

  let k = 0; // up to index k the array holds unique elements
  for (let j = 1; j < nums.length; j++) {
    if (nums[k] !== nums[j]) {
      k++;
      nums[k] = nums[j];
    }
  }

  return k + 1;
}

// TIME COMPLEXITY = O(N)
// SPACE COMPLEXITY = O(1)

// Test cases:
const a1 = [1, 1, 2];
console.log(removeDuplicates(a1), a1.slice(0, 2)); // 2 [ 1, 2 ]

const a2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
console.log(removeDuplicates(a2), a2.slice(0, 5)); // 5 [ 0, 1, 2, 3, 4 ]

const a3 = [5];
console.log(removeDuplicates(a3), a3.slice(0, 1)); // 1 [ 5 ]

const a4: number[] = [];
console.log(removeDuplicates(a4)); // 0

export {};
