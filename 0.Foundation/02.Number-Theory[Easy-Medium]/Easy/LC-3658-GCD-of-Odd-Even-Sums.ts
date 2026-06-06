// 3658. GCD of Odd and Even Sums (LeetCode - Easy)
// Given n, return GCD of sum of first n odd numbers and sum of first n even numbers.
//
// Example 1: n = 4 -> GCD(1+3+5+7, 2+4+6+8) = GCD(16, 20) = 4
// Example 2: n = 5 -> GCD(1+3+5+7+9, 2+4+6+8+10) = GCD(25, 30) = 5

/* =============================================
   Approach 1: Brute Force
   TC: O(n + log(n)) - n for summing, log for GCD
   SC: O(1)

   First n odd numbers:  1, 3, 5, ... (2*i - 1)
   First n even numbers: 2, 4, 6, ... (2*i)
   Sum them up, then find GCD.
   ============================================= */
function gcdOfOddEvenSumsBrute(n: number): number {
    let sumOdd = 0;
    let sumEven = 0;
    for (let i = 1; i <= n; i++) {
        sumOdd += 2 * i - 1;
        sumEven += 2 * i;
    }
    return gcd(sumOdd, sumEven);
}

function gcd(a: number, b: number): number {
    if (a === 0) return b;
    return gcd(b % a, a);
}

/* =============================================
   Approach 2: Math - O(1)
   TC: O(1)
   SC: O(1)

   Key formulas:
   Sum of first n odd numbers  = n * n = n^2
   Sum of first n even numbers = n * (n + 1)

   So: GCD(n^2, n*(n+1))
     = n * GCD(n, n+1)

   But n and n+1 are consecutive numbers -> always coprime -> GCD(n, n+1) = 1

   Therefore: answer is always n

   Proof that consecutive numbers are coprime:
   If d divides both n and n+1, then d divides (n+1) - n = 1
   So d = 1, meaning GCD(n, n+1) = 1
   ============================================= */
function gcdOfOddEvenSums(n: number): number {
    return n;
}

// Dry run:
// n=4: sumOdd=16=4^2, sumEven=20=4*5, GCD(16,20)=4*GCD(4,5)=4*1=4
// n=5: sumOdd=25=5^2, sumEven=30=5*6, GCD(25,30)=5*GCD(5,6)=5*1=5

console.log(gcdOfOddEvenSums(4));   // 4
console.log(gcdOfOddEvenSums(5));   // 5
console.log(gcdOfOddEvenSumsBrute(4));  // 4
console.log(gcdOfOddEvenSumsBrute(5));  // 5

export {};
