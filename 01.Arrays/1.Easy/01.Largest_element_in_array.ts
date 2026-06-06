/*
QUESTION:-
Given an array A[] of size n. The task is to find the largest element in it.

Example:

Input:
n = 5
A[] = {1, 8, 7, 56, 90}
Output:
90
Explanation:
The largest element of given array is 90
*/

/*
APPROACH:-
-> Intialize the ans with starting element
-> Traverse the entire array and update the ans if the element is greater then ans
-> Finally, return the ans
*/

// CODE:-
function largest(numbers: number[], size: number): number {
  let largestElement = numbers[0];

  for (let index = 1; index < size; index++) {
    if (numbers[index] > largestElement) {
      largestElement = numbers[index];
    }
  }

  return largestElement;
}

// TIME COMPLEXITY = O(N)
// SPACE COMPLEXITY = O(1)
