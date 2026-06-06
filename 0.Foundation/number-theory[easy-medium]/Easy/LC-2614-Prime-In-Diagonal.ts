// 2614. Prime In Diagonal (LeetCode - Easy)
// Return the largest prime on any diagonal of a 2D matrix. Return 0 if none.
//
// Example 1: [[1,2,3],[5,6,7],[9,10,11]] -> 11
// Example 2: [[1,2,3],[5,17,7],[9,11,10]] -> 17

/* =============================================
   Approach: Extract diagonals + check prime
   TC: O(n * sqrt(maxVal)) - n diagonal elements, sqrt check for each
   SC: O(1) - no extra space

   Two diagonals in an n*n matrix:
   Primary:   nums[i][i]           -> (0,0), (1,1), (2,2)...
   Secondary: nums[i][n - 1 - i]   -> (0,2), (1,1), (2,0)...

   For each diagonal element, check if prime, track the max.
   ============================================= */
function diagonalPrime(nums: number[][]): number {
    const n = nums.length;
    let maxPrime = 0;

    for (let i = 0; i < n; i++) {
        // Primary diagonal
        const primary = nums[i][i];
        if (isPrime(primary) && primary > maxPrime) {
            maxPrime = primary;
        }

        // Secondary diagonal
        const secondary = nums[i][n - 1 - i];
        if (isPrime(secondary) && secondary > maxPrime) {
            maxPrime = secondary;
        }
    }

    return maxPrime;
}

function isPrime(n: number): boolean {
    if (n < 2) return false;
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) return false;
    }
    return true;
}

// Dry run: nums = [[1,2,3],[5,17,7],[9,11,10]]
// i=0: primary=1 (not prime), secondary=3 (prime) -> maxPrime=3
// i=1: primary=17 (prime, 17>3) -> maxPrime=17, secondary=17 (same)
// i=2: primary=10 (not prime), secondary=9 (not prime)
// Answer: 17

console.log(diagonalPrime([[1,2,3],[5,6,7],[9,10,11]]));   // 11
console.log(diagonalPrime([[1,2,3],[5,17,7],[9,11,10]]));   // 17

export {};
