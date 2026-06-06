/* 1979. Find Greatest Common Divisor of Array (LeetCode - Easy)
 Given an integer array nums, return the GCD of the smallest and largest number in nums.

 Example 1: nums = [2,5,6,9,10] -> 2  (GCD of 2 and 10)
 Example 2: nums = [7,5,6,8,3]  -> 1  (GCD of 3 and 8)
 Example 3: nums = [3,3]        -> 3  (GCD of 3 and 3)

 */

/* =============================================
   Approach 1: Find min & max, then GCD (Euclidean)
   TC: O(n + log(min)) - O(n) to find min/max, O(log(min)) for GCD
   SC: O(log(min)) - recursive call stack for GCD (can be O(1) with iterative)
   ============================================= */
function findGCD(nums: number[]): number {
    let min = nums[0];
    let max = nums[0];
    for (const n of nums) {
        if (n < min) min = n;
        if (n > max) max = n;
    }
    return gcd(min, max);
}

function gcd(a: number, b: number): number {
    if (a === 0) return b;
    return gcd(b % a, a);
}

/* =============================================
   Approach 2 (wrong read): GCD of entire array
   This is NOT what the problem asks, but useful to know.
   TC: O(n * log(min))
   SC: O(log(min))
   ============================================= */
function findGCDOfAll(nums: number[]): number {
    let result = 0;
    for (const n of nums) {
        result = gcd(result, n);
    }
    return result;
}

/* =============================================
   Test Cases
   ============================================= */
console.log(findGCD([2, 5, 6, 9, 10]));  // 2
console.log(findGCD([7, 5, 6, 8, 3]));   // 1
console.log(findGCD([3, 3]));             // 3

export {};
