// 3461. Check If Digits Are Equal in String After Operations I (LeetCode - Easy)
// Repeatedly replace each pair of consecutive digits with (sum % 10) until 2 digits remain.
// Return true if the final two digits are the same.
//
// Example 1: "3902" -> "292" -> "11" -> true
// Example 2: "34789" -> "7157" -> "862" -> "48" -> false

/* =============================================
   Approach: Recursive Reduction
   TC: O(n^2) - each step reduces length by 1, so n-2 steps, each iterates remaining length
   SC: O(n) - recursive call stack depth is n-2, plus temp array each step

   Each step: for every consecutive pair, compute (a + b) % 10
   Repeat until only 2 digits left, then compare them.
   ============================================= */
function hasSameDigits(s: string): boolean {
    if (s.length === 2) return s[0] === s[1];
    return hasSameDigits(helper(s));
}

function helper(nums: string): string {
    const res: number[] = [];
    for (let i = 0; i < nums.length - 1; i++) {
        res.push((Number(nums[i]) + Number(nums[i + 1])) % 10);
    }
    return res.join('');
}

// Dry run: "3902"
// Step 1: (3+9)%10=2, (9+0)%10=9, (0+2)%10=2 -> "292"
// Step 2: (2+9)%10=1, (9+2)%10=1              -> "11"
// Step 3: s[0]==='1' === s[1]==='1'            -> true

console.log(hasSameDigits("3902"));  // true
console.log(hasSameDigits("34789")); // false
