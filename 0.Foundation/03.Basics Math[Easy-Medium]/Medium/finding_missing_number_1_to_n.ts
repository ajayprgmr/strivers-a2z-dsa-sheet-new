/*
statement: Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.
[1,2,3,5,6,7,8,9,10]

*/


// First Method : Bruteforce --> TC: O(nlogn)
function missingNumber_1(nums: number[]): number {
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== i) {
            return i;
        }
    }
    return nums.length;
}


// Second Method : Optimized Solution (using sum formula, O(n) time, O(1) space)
function missingNumber_2(nums: number[]): number {
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((acc, num) => acc + num, 0);
    return expectedSum - actualSum;
}
