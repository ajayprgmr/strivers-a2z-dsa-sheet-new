// 1952. Three Divisors (LeetCode - Easy)
// Given an integer n, return true if n has exactly three positive divisors. Otherwise, return false.
//
// Example 1: n = 2 -> false (divisors: 1, 2)
// Example 2: n = 4 -> true  (divisors: 1, 2, 4)

/* =============================================
   Approach 1: Brute Force
   TC: O(n) - check every number from 1 to n
   SC: O(1)
   ============================================= */
function isThreeBruteForce(n: number): boolean {
    let count = 0;
    for (let i = 1; i <= n; i++) {
        if (n % i === 0) count++;
        if (count > 3) return false;
    }
    return count === 3;
}

/* =============================================
   Approach 2: Math - Perfect Square of Prime
   TC: O(n^0.25) - sqrt check is O(1), isPrime runs till sqrt(sqrt(n))
   SC: O(1)

   Why it works:
   Divisors come in pairs: (i, n/i). So divisor count is always EVEN.
   Only way to get ODD count (3) -> one pair is same -> i*i = n -> perfect square.
   If n = p*p where p is prime -> only divisors are 1, p, p*p -> exactly 3.
   If p is NOT prime -> its sub-factors create extra divisors -> more than 3.

   Dry run:
   n=4  -> sqrt=2, isPrime(2)=true  -> true  (1,2,4)
   n=9  -> sqrt=3, isPrime(3)=true  -> true  (1,3,9)
   n=16 -> sqrt=4, isPrime(4)=false -> false (1,2,4,8,16 -> 5 divisors)
   n=6  -> sqrt=2.44, not perfect square    -> false
   ============================================= */
function isThree(n: number): boolean {
    const sqrt = Math.sqrt(n);
    const isPerfectSquare = sqrt === Math.floor(sqrt);

    if (!isPerfectSquare) return false;

    return isPrime(sqrt);
}

function isPrime(n: number): boolean {
    if (n < 2) return false;
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) return false;
    }
    return true;
}

/* =============================================
   Test Cases: 1 to 10^4
   Verifies optimized solution against brute force
   ============================================= */
let passed = 0;
let failed = 0;
const threeResults: number[] = [];

for (let n = 1; n <= 10000; n++) {
    const optimized = isThree(n);
    const brute = isThreeBruteForce(n);

    if (optimized !== brute) {
        console.log(`FAIL at n=${n} | isThree=${optimized} | bruteForce=${brute}`);
        failed++;
    } else {
        passed++;
    }

    if (optimized) threeResults.push(n);
}

console.log(`\n--- Test Results (1 to 10000) ---`);
console.log(`Passed: ${passed} | Failed: ${failed}`);
console.log(`\nNumbers with exactly 3 divisors (${threeResults.length} total):`);
console.log(threeResults.map(n => `${Math.sqrt(n)}^2 = ${n}`).join(', '));

export {};
