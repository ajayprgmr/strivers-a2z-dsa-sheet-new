/**
 * PALINDROME DEFINITION:
 * A palindrome is a number, word, phrase, or sequence that reads the same backward as forward.
 * 
 * For numbers:
 * - 121 is a palindrome (reads as 121 from both directions)
 * - 1221 is a palindrome 
 * - 123 is NOT a palindrome (reads as 321 backward)
 * 
 * Properties:
 * - Negative numbers are typically NOT considered palindromes due to the minus sign
 * - Single digit numbers (0-9) are always palindromes
 * - Leading zeros are ignored (so 120 ≠ 021)
 */


// =============================================================================
// RELATED  PROBLEMS - PALINDROMES
// =============================================================================

/**
 * EASY PROBLEMS:
 * 
 * 9. Palindrome Number
 * https://leetcode.com/problems/palindrome-number/
 * Description: Given an integer x, return true if x is a palindrome, and false otherwise.
 * 
 * 125. Valid Palindrome  
 * https://leetcode.com/problems/valid-palindrome/
 * Description: Check if a string is a palindrome, ignoring spaces and case.
 * 
 * 234. Palindrome Linked List
 * https://leetcode.com/problems/palindrome-linked-list/
 * Description: Given the head of a singly linked list, return true if it is a palindrome.
 */


/**
 * MEDIUM PROBLEMS:
 * 
 * 5. Longest Palindromic Substring
 * https://leetcode.com/problems/longest-palindromic-substring/
 * Description: Given a string s, return the longest palindromic substring in s.
 * 
 * 131. Palindrome Partitioning
 * https://leetcode.com/problems/palindrome-partitioning/
 * Description: Partition string such that every substring is a palindrome.
 * 
 * 647. Palindromic Substrings
 * https://leetcode.com/problems/palindromic-substrings/
 * Description: Count the number of palindromic substrings in a string.
 * 
 * 516. Longest Palindromic Subsequence
 * https://leetcode.com/problems/longest-palindromic-subsequence/
 * Description: Find the length of the longest palindromic subsequence.
 */

/**
 * HARD PROBLEMS:
 * 
 * 214. Shortest Palindrome
 * https://leetcode.com/problems/shortest-palindrome/
 * Description: Add characters in front of string to make it a palindrome.
 * 
 * 336. Palindrome Pairs
 * https://leetcode.com/problems/palindrome-pairs/
 * Description: Find all pairs of unique words that form palindromes.
 * 
 * 1312. Minimum Insertion Steps to Make a String Palindrome
 * https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/
 * Description: Return minimum insertions to make string palindrome.
 */


// Node class for Linked List problems
class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}


// =============================================================================
// EASY PROBLEMS CLASS
// =============================================================================
class Easy {
    // LeetCode 9: Palindrome Number
    leetcode9_palindromeNumber(x: number): boolean {
        if (x < 0) return false;
        if (x < 10) return true;
        
        let original = x;
        let reversed = 0;
        
        while (x > 0) {
            reversed = reversed * 10 + x % 10;
            x = Math.floor(x / 10);
        }
        
        return original === reversed;
    }
    
    // LeetCode 125: Valid Palindrome
    leetcode125_validPalindrome(s: string): boolean {
        const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
        const len = cleaned.length;
        
        for (let i = 0; i < Math.floor(len / 2); i++) {
            if (cleaned[i] !== cleaned[len - 1 - i]) {
                return false;
            }
        }
        
        return true;
    }
    
    // LeetCode 234: Palindrome Linked List
    leetcode234_palindromeLinkedList(head: ListNode | null): boolean {
        if (!head || !head.next) return true;
        
        const values: number[] = [];
        let current = head;
        
        while (current) {
            values.push(current.val);
            current = current.next;
        }
        
        const len = values.length;
        for (let i = 0; i < Math.floor(len / 2); i++) {
            if (values[i] !== values[len - 1 - i]) {
                return false;
            }
        }
        
        return true;
    }
}

// =============================================================================
// MEDIUM PROBLEMS CLASS
// =============================================================================
class Medium {
    // LeetCode 5: Longest Palindromic Substring
    leetcode5_longestPalindromicSubstring(s: string): string {
        if (!s || s.length < 2) return s;
        
        let start = 0;
        let maxLength = 1;
        
        const expandAroundCenter = (left: number, right: number): number => {
            while (left >= 0 && right < s.length && s[left] === s[right]) {
                left--;
                right++;
            }
            return right - left - 1;
        };
        
        for (let i = 0; i < s.length; i++) {
            const len1 = expandAroundCenter(i, i);
            const len2 = expandAroundCenter(i, i + 1);
            const len = Math.max(len1, len2);
            
            if (len > maxLength) {
                maxLength = len;
                start = i - Math.floor((len - 1) / 2);
            }
        }
        
        return s.substring(start, start + maxLength);
    }
    
    // LeetCode 131: Palindrome Partitioning
    leetcode131_palindromePartitioning(s: string): string[][] {
        const result: string[][] = [];
        const path: string[] = [];
        
        const isPalindrome = (str: string): boolean => {
            let left = 0, right = str.length - 1;
            while (left < right) {
                if (str[left] !== str[right]) return false;
                left++;
                right--;
            }
            return true;
        };
        
        const backtrack = (startIndex: number): void => {
            if (startIndex === s.length) {
                result.push([...path]);
                return;
            }
            
            for (let i = startIndex; i < s.length; i++) {
                const substring = s.substring(startIndex, i + 1);
                if (isPalindrome(substring)) {
                    path.push(substring);
                    backtrack(i + 1);
                    path.pop();
                }
            }
        };
        
        backtrack(0);
        return result;
    }
    
    // LeetCode 647: Palindromic Substrings
    leetcode647_palindromicSubstrings(s: string): number {
        let count = 0;
        
        const expandAroundCenter = (left: number, right: number): void => {
            while (left >= 0 && right < s.length && s[left] === s[right]) {
                count++;
                left--;
                right++;
            }
        };
        
        for (let i = 0; i < s.length; i++) {
            expandAroundCenter(i, i);
            expandAroundCenter(i, i + 1);
        }
        
        return count;
    }
    
    // LeetCode 516: Longest Palindromic Subsequence
    leetcode516_longestPalindromicSubsequence(s: string): number {
        const n = s.length;
        const dp: number[][] = Array(n).fill(null).map(() => Array(n).fill(0));
        
        for (let i = n - 1; i >= 0; i--) {
            dp[i][i] = 1;
            for (let j = i + 1; j < n; j++) {
                if (s[i] === s[j]) {
                    dp[i][j] = dp[i + 1][j - 1] + 2;
                } else {
                    dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
                }
            }
        }
        
        return dp[0][n - 1];
    }
}

// =============================================================================
// HARD PROBLEMS CLASS
// =============================================================================
class Hard {
    // LeetCode 214: Shortest Palindrome
    leetcode214_shortestPalindrome(s: string): string {
        if (!s) return s;
        
        const reversed = s.split('').reverse().join('');
        
        for (let i = 0; i < s.length; i++) {
            if (s.startsWith(reversed.substring(i))) {
                return reversed.substring(0, i) + s;
            }
        }
        
        return reversed + s;
    }
    
    // LeetCode 336: Palindrome Pairs
    leetcode336_palindromePairs(words: string[]): number[][] {
        const result: number[][] = [];
        
        const isPalindrome = (str: string): boolean => {
            let left = 0, right = str.length - 1;
            while (left < right) {
                if (str[left] !== str[right]) return false;
                left++;
                right--;
            }
            return true;
        };
        
        for (let i = 0; i < words.length; i++) {
            for (let j = 0; j < words.length; j++) {
                if (i !== j && isPalindrome(words[i] + words[j])) {
                    result.push([i, j]);
                }
            }
        }
        
        return result;
    }
    
    // LeetCode 1312: Minimum Insertion Steps to Make a String Palindrome
    leetcode1312_minInsertionSteps(s: string): number {
        const n = s.length;
        const dp: number[][] = Array(n).fill(null).map(() => Array(n).fill(0));
        
        for (let len = 2; len <= n; len++) {
            for (let i = 0; i <= n - len; i++) {
                const j = i + len - 1;
                if (s[i] === s[j]) {
                    dp[i][j] = dp[i + 1][j - 1];
                } else {
                    dp[i][j] = Math.min(dp[i + 1][j], dp[i][j - 1]) + 1;
                }
            }
        }
        
        return dp[0][n - 1];
    }
}

// Generic Palindrome Problems Class
class PalindromeProblems {
    public easy: Easy;
    public medium: Medium;
    public hard: Hard;
    
    constructor() {
        this.easy = new Easy();
        this.medium = new Medium();
        this.hard = new Hard();
    }
    
    // Helper method to create linked list from array
    createLinkedList(arr: number[]): ListNode | null {
        if (arr.length === 0) return null;
        
        const head = new ListNode(arr[0]);
        let current = head;
        
        for (let i = 1; i < arr.length; i++) {
            current.next = new ListNode(arr[i]);
            current = current.next;
        }
        
        return head;
    }
}

// Usage Example
const palindromeProblems = new PalindromeProblems();

console.log(palindromeProblems.easy.leetcode125_validPalindrome('strint'));