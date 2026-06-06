/* 2427. Number of Common Factors (LeetCode - Easy)
   Given two positive integers a and b, return the number of common factors of a and b.
   An integer x is a common factor of a and b if x divides both a and b.

   Example 1: a = 12, b = 6  -> 4 (common factors: 1, 2, 3, 6)
   Example 2: a = 25, b = 30 -> 2 (common factors: 1, 5)
*/

/* =============================================
   Approach 1: Brute Force - Check all numbers up to min(a, b)
   TC: O(min(a, b))
   SC: O(1)

   Any common factor can't be larger than the smaller number.
   So loop 1 to min(a,b) and count numbers that divide both.
   ============================================= */
   
function commonFactorsBrute(a: number, b: number): number {
    let count = 0;
    const limit = Math.min(a, b);
    for (let i = 1; i <= limit; i++) {
        if (a % i === 0 && b % i === 0) count++;
    }
    return count;
}

/* =============================================
   Approach 2: GCD + Count divisors of GCD
   TC: O(log(min(a,b)) + sqrt(GCD)) - log for GCD, sqrt for counting divisors
   SC: O(1)

   Key insight: every common factor of a and b must also divide GCD(a, b).
   So instead of checking all numbers up to min(a,b),
   just find GCD and count its divisors.

   Example: a=12, b=6
   GCD(12, 6) = 6
   Divisors of 6: 1, 2, 3, 6 -> 4 common factors

   Counting divisors in O(sqrt(n)):
   If i divides n, then n/i also divides n (they come in pairs).
   So only loop up to sqrt(n).
   ============================================= */
function commonFactors(a: number, b: number): number {
    const g = gcd(a, b);
    let count = 0;
    for (let i = 1; i * i <= g; i++) {
        if (g % i === 0) {
            count++;                // i is a divisor
            if (i !== g / i) count++; // g/i is also a divisor (avoid double counting when i*i === g)
        }
    }
    return count;
}

function gcd(a: number, b: number): number {
    if (a === 0) return b;
    return gcd(b % a, a);
}

/* =============================================
   BETTER APPROACH: Approach 2 (GCD + sqrt)

   Why? Compare with a = 1000, b = 1000:
   - Approach 1: loops 1 to 1000           -> 1000 iterations
   - Approach 2: GCD = 1000, sqrt(1000)=31 -> ~31 iterations

   Approach 1 checks every number up to min(a,b) even though
   most of them won't divide both a and b — wasted work.

   Approach 2 is smarter:
   1. First narrows the problem using GCD (common factors MUST divide GCD)
   2. Then counts divisors of GCD using sqrt trick (divisors come in pairs)

   Result: O(sqrt(GCD)) << O(min(a,b)) for large inputs
   ============================================= */

/* =============================================
   Test Cases
   ============================================= */
console.log(commonFactors(12, 6));   // 4
console.log(commonFactors(25, 30));  // 2
console.log(commonFactors(1, 1));    // 1

console.log(commonFactorsBrute(12, 6));   // 4
console.log(commonFactorsBrute(25, 30));  // 2

export {};
