// 3411. Maximum Subarray With Equal Products (LeetCode - Easy)
// Return length of longest subarray where prod(arr) == lcm(arr) * gcd(arr)
//
// Example 1: [1,2,1,2,1,1,1] -> 5
// Example 2: [2,3,4,5,6] -> 3
// Example 3: [1,2,3,1,4,5,1] -> 5

/* =============================================
   Approach: Brute Force - Check all subarrays
   TC: O(n^2 * log(maxVal)) - n^2 subarrays, log for GCD/LCM per element
   SC: O(1)

   For each subarray [i..j], maintain running gcd, lcm, product.
   Check if product === lcm * gcd, track max length.

   Key: LCM must be computed iteratively using LCM(a,b) = (a*b)/GCD(a,b)
   You CANNOT do product/GCD for LCM of multiple numbers.

   Why product/GCD doesn't work for LCM of multiple numbers?
   Example: LCM(2,3,4)
   - product = 24, GCD = 1, product/GCD = 24
   - But actual LCM(2,3,4) = 12 (not 24)
   - Must compute iteratively: LCM(2,3)=6, then LCM(6,4)=12
   ============================================= */
function maxLength(nums: number[]): number {
    let finalRes = 0;

    for (let i = 0; i < nums.length; i++) {
        let gcdRes = 0;
        let prodArr = 1;
        let lcmArr = 1;

        for (let j = i; j < nums.length; j++) {
            gcdRes = gcd(gcdRes, nums[j]);
            prodArr = prodArr * nums[j];
            lcmArr = lcm(lcmArr, nums[j]);

            if (prodArr === lcmArr * gcdRes) {
                finalRes = Math.max(finalRes, j - i + 1);
            }
        }
    }

    return finalRes;
}

function gcd(a: number, b: number): number {
    if (a === 0) return b;
    return gcd(b % a, a);
}

function lcm(a: number, b: number): number {
    return (a * b) / gcd(a, b);
}

console.log(maxLength([1, 2, 1, 2, 1, 1, 1])); // 5
console.log(maxLength([2, 3, 4, 5, 6]));       // 3
console.log(maxLength([1, 2, 3, 1, 4, 5, 1])); // 5

export {};
