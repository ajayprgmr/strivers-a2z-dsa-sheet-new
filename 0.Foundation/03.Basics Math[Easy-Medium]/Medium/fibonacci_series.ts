/**
 * FIBONACCI SEQUENCE DEFINITION:
 * The Fibonacci sequence is a series where each number is the sum of the two preceding numbers.
 * 
 * Traditional definition: F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2) for n > 1
 * Sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377...
 * 
 * Some variations start with 1, 1 instead of 0, 1, but the mathematical standard starts with 0, 1.
 */

// First method: Bruteforce for printing
function printFibonacciSeries1(n: number): number[] {
  let fibonacci: number[] = [0, 1]; // set initial conditions
  for (let i = 2; i < n; ++i) {
    // add the two previous elements to get the current element
    fibonacci[i] = fibonacci[i - 2] + fibonacci[i - 1];
  }
  return fibonacci;
}

// Second method: Optimized for printing
function printFibonacciSeries2(n: number): void {
  let a: number = 0, b: number = 1;
  if (n > 0) console.log(a.toString());
  if (n > 1) console.log(b.toString());
  for (let i = 2; i < n; ++i) {
    let next: number = a + b; // Calculate the next Fibonacci number
    console.log(next.toString()); // Print the next Fibonacci number
    a = b; // Update 'a' to be the last Fibonacci number
    b = next; // Update 'b' to be the current Fibonacci number
  }
}

printFibonacciSeries2(10);