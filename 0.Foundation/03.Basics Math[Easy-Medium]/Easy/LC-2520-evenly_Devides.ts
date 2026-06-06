/*
--> count-the-digits-that-divide-a-number
--> Note :- Evenly divides means whether N is divisible by a digit i.e. leaves a remainder 0 when divided.
--> Leetcode : https://leetcode.com/problems/count-the-digits-that-divide-a-number/description/

*/

function countDigits(num: number): number {
  let count = 0;
  let tempNum = num;

  while (tempNum > 0) {
    let d = tempNum % 10;
    console.log('digit', d);

    // Prevent division by zero
    if (d !== 0 && num % d === 0) {
      count++;
    }

    tempNum = Math.floor(tempNum / 10); //floor division
  }

  return count;
}


console.log(countDigits(20))

