// 258. Add Digits (LeetCode - Easy)
// Given an integer num, repeatedly add all its digits until the result has only one digit, and return it.
// Example: 38 --> 3 + 8 --> 11 --> 1 + 1 --> 2

// =============================================
// Approach 1: Recursive Digit Sum
// TC: O(log n) — each call loops through digits (log10(n)), recursion depth is near constant O(log(log(n)))
// SC: O(log(log(n))) — recursive call stack depth (practically O(1), max 2-3 frames even for huge numbers)
// =============================================
function digitsSumCummulator(num: number): number {
    let result: number = 0;
    let tempNum: number = num;
    while (tempNum > 0) {
        const d = tempNum % 10;
        result += d;
        tempNum = Math.floor(tempNum / 10);
    }
    return result;
}

function addDigitsRecursive(num: number): number {
    const sumReturn = digitsSumCummulator(num);
    if (Math.floor(sumReturn / 10) === 0) return sumReturn;
    else {
        return addDigitsRecursive(sumReturn);
    }
}

// =============================================
// Approach 2: Digital Root Formula (Math)
// TC: O(1) — single arithmetic operation, no loops, no recursion
// SC: O(1) — no extra space used
//
// Why it works:
// 10 ≡ 1 (mod 9), so any number mod 9 = sum of its digits mod 9
// e.g. 385 = 3×100 + 8×10 + 5 = 3×1 + 8×1 + 5×1 (mod 9) = 16 (mod 9) = 7
//
// Digital roots cycle: 1,2,3,4,5,6,7,8,9, 1,2,3,4,5,6,7,8,9, ...
// num % 9 gives 0 for multiples of 9, but digital root should be 9
// (num - 1) % 9 + 1 handles this edge case cleanly
//
// Dry run:
// num = 38  → 1 + (37 % 9) = 1 + 1 = 2  ✅
// num = 9   → 1 + (8 % 9)  = 1 + 8 = 9  ✅
// num = 18  → 1 + (17 % 9) = 1 + 8 = 9  ✅
// num = 0   → early return 0              ✅
// =============================================
function addDigits(num: number): number {
    if (num === 0) return 0;
    return 1 + (num - 1) % 9;
}

console.log(addDigitsRecursive(38));  // 2
console.log(addDigitsRecursive(0));   // 0
console.log(addDigits(38));           // 2
console.log(addDigits(0));            // 0
