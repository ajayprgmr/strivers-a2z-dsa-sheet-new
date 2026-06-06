/* 2413. Smallest Even Multiple (LeetCode - Easy)
   Given a positive integer n, return the smallest positive integer
   that is a multiple of both 2 and n.

   Example 1: n = 5 -> 10 (5 is odd, so 5 * 2 = 10)
   Example 2: n = 6 -> 6  (6 is already even, multiple of itself)
*/

/* =============================================
   Approach 1: Simple Even/Odd Check
   TC: O(1)
   SC: O(1)

   If n is even -> n is already a multiple of 2 -> return n
   If n is odd  -> multiply by 2 to make it even -> return n * 2
   ============================================= */
function smallestEvenMultiple(n: number): number {
    if (n % 2 === 0) return n;
    return n * 2;
}

/* =============================================
   Approach 2: LCM Formula
   TC: O(1)
   SC: O(1)

   LCM(a, b) = (a * b) / GCD(a, b)
   LCM(n, 2) = (n * 2) / GCD(n, 2)

   GCD(n, 2) is either 1 (n is odd) or 2 (n is even)
   So: odd  -> (n * 2) / 1 = n * 2
       even -> (n * 2) / 2 = n
   Same result, but uses math instead of if/else
   ============================================= */
function smallestEvenMultipleLCM(n: number): number {
    return (n * 2) / gcd(n, 2);
}

function gcd(a: number, b: number): number {
    if (a === 0) return b;
    return gcd(b % a, a);
}

/* =============================================
   Test Cases
   ============================================= */
console.log(smallestEvenMultiple(5));    // 10
console.log(smallestEvenMultiple(6));    // 6
console.log(smallestEvenMultiple(1));    // 2
console.log(smallestEvenMultiple(2));    // 2

console.log(smallestEvenMultipleLCM(5)); // 10
console.log(smallestEvenMultipleLCM(6)); // 6

export {};
