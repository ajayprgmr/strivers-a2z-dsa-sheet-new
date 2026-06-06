// 3591. Check if Any Element Has Prime Frequency (LeetCode - Easy)
// Return true if the frequency of any element in the array is prime.
//
// Example 1: [1,2,3,4,5,4] -> true  (4 appears 2 times, 2 is prime)
// Example 2: [1,2,3,4,5]   -> false (all appear once, 1 is not prime)
// Example 3: [2,2,2,4,4]   -> true  (2 appears 3 times, 4 appears 2 times, both prime)

/* =============================================
   Approach: Frequency Map + Prime Check
   TC: O(n * sqrt(maxFreq)) - n for counting, sqrt check per unique element
   SC: O(n) - frequency map

   Steps:
   1. Count frequency of each element using a Map
   2. For each frequency, check if it's prime
   3. Return true if ANY frequency is prime, false otherwise
   ============================================= */
function checkPrimeFrequency(nums: number[]): boolean {
    const map = new Map<number, number>();
    nums.forEach((val) => {
        map.set(val, (map.get(val) || 0) + 1);
    });
    for (const freq of map.values()) {
        if (isPrime(freq)) return true;
    }
    return false;
}

function isPrime(n: number): boolean {
    if (n < 2) return false;
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) return false;
    }
    return true;
}

// Dry run: [1,2,3,4,5,4]
// map: {1:1, 2:1, 3:1, 4:2, 5:1}
// freq=1 -> isPrime(1)=false
// freq=1 -> false
// freq=1 -> false
// freq=2 -> isPrime(2)=true -> return true

console.log(checkPrimeFrequency([1,2,3,4,5,4])); // true
console.log(checkPrimeFrequency([1,2,3,4,5]));    // false
console.log(checkPrimeFrequency([2,2,2,4,4]));    // true

export {};
