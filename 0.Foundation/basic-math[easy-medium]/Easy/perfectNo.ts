/*
A perfect number is a positive integer that is equal to the sum of its positive divisors, excluding the number itself. A divisor of an integer x is an integer that can divide x evenly.
Given an integer n, return true if n is a perfect number, otherwise return false.
Leetcode: https://leetcode.com/problems/perfect-number/description/
*/

function checkPerfectNumber(num: number): boolean {
  if (num <= 1) return false;
  let sumDiv = 1; // start with 1 because 1 is a proper divisor of any number
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      sumDiv += i;
      if (i !== num / i) {
        sumDiv += num / i;
      }
    }
  }
  return sumDiv === num;
}

console.log(checkPerfectNumber(28)); // true