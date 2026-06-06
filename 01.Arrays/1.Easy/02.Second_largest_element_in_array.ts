/*
QUESTION:-
Given an array Arr of size N, print second largest distinct element from an array.

Example:

Input:
N = 6
Arr[] = {12, 35, 1, 10, 34, 1}
Output: 34
Explanation: The largest element of the
array is 35 and the second largest element
is 34.
*/

/*
APPROACH
-> If the current element is larger than ‘large’ then update second_large and large variables
-> Else if the current element is larger than ‘second_large’ then we update the variable second_large.
-> Once we traverse the entire array, we would find the second largest element in the variable second_large.
*/

// CODE:-
function secondLargestDistinct(numbers: number[], size: number): number {
  if (size < 2) {
    return -1;
  }

  let largestElement = numbers[0];
  let secondLargestElement = Number.NEGATIVE_INFINITY;

  for (let index = 1; index < size; index++) {
    const currentElement = numbers[index];

    if (currentElement > largestElement) {
      secondLargestElement = largestElement;
      largestElement = currentElement;
    } else if (
      currentElement < largestElement &&
      currentElement > secondLargestElement
    ) {
      secondLargestElement = currentElement;
    }
  }

  return secondLargestElement === Number.NEGATIVE_INFINITY
    ? -1
    : secondLargestElement;
}

const arr: number[] = [-1, -3, -4, -2, -3, -2, -2, -2, -2]
const result = secondLargestDistinct(arr, arr.length)

console.log(result)

// TIME COMPLEXITY = O(N)
// SPACE COMPLEXITY = O(1)

export { }
