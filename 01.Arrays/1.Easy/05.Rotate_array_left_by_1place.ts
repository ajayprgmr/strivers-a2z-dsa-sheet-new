/*
QUESTION:-
Given an array ARR containing N elements, rotate the array left by one place:
shift every element one position to the left and move the first element to the
last position.

Example:
Input: N = 5, ARR = [1, 2, 3, 4, 5]
Output: [2, 3, 4, 5, 1]
Explanation: Each element moves one slot left and the original first element (1)
wraps around to the end.
*/

/*
APPROACH:-
The result satisfies arr[i] = arr[i + 1], with the original first element landing
at the last position.

-> Save arr[0] in a temp variable.
-> Traverse from left to right copying arr[i + 1] into arr[i].
-> Finally place the saved value at arr[n - 1].
This shifts everything left by one in a single in-place pass.
*/

// CODE:-
function rotateArray(arr: number[], n: number): number[] {
  if (n <= 1) return arr;

  const temp = arr[0];
  for (let i = 0; i < n - 1; i++) {
    arr[i] = arr[i + 1];
  }
  arr[n - 1] = temp;

  return arr;
}

// TIME COMPLEXITY = O(N)
// SPACE COMPLEXITY = O(1)

// Test cases:
console.log(rotateArray([1, 2, 3, 4, 5], 5)); // [ 2, 3, 4, 5, 1 ]
console.log(rotateArray([7], 1)); // [ 7 ]
console.log(rotateArray([9, 8], 2)); // [ 8, 9 ]

export {};
