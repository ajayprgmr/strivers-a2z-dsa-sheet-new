// Print All Subarrays of an Array
// Given an array, print every possible contiguous subarray.
//
// Example: [1, 3, 4] -> [1], [1,3], [1,3,4], [3], [3,4], [4]

/* =============================================
   Approach 1: Three nested loops
   TC: O(n^3) - n^2 subarrays, each up to n elements to collect
   SC: O(n) - temporary subarray storage

   i = start index
   j = end index
   k = loop from i to j to collect elements
   ============================================= */
function printAllSubarrays(nums: number[]): void {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i; j < nums.length; j++) {
            const subarray: number[] = [];
            for (let k = i; k <= j; k++) {
                subarray.push(nums[k]);
            }
            console.log(subarray);
        }
    }
}

/* =============================================
   Approach 2: Using slice (cleaner)
   TC: O(n^3) - n^2 subarrays, slice copies up to n elements
   SC: O(n) - sliced subarray

   slice(i, j+1) gives elements from index i to j (inclusive)
   ============================================= */
function printAllSubarraysSlice(nums: number[]): void {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i; j < nums.length; j++) {
            console.log(nums.slice(i, j + 1));
        }
    }
}

/* =============================================
   Total subarrays for array of length n = n*(n+1)/2

   Why?
   Starting at index 0: n subarrays   [0..0], [0..1], ..., [0..n-1]
   Starting at index 1: n-1 subarrays [1..1], [1..2], ..., [1..n-1]
   Starting at index 2: n-2 subarrays
   ...
   Starting at index n-1: 1 subarray
   Total = n + (n-1) + (n-2) + ... + 1 = n*(n+1)/2
   ============================================= */

const nums = [1, 3, 4, 5, 6, 7];
console.log(`Total subarrays: ${nums.length * (nums.length + 1) / 2}`);
console.log('\n--- Approach 1: Three loops ---');
printAllSubarrays(nums);
console.log('\n--- Approach 2: Slice ---');
printAllSubarraysSlice(nums);
