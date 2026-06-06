// Given a Number N we Need to count the number of digits in N

function count_Digits(N: number): number {
    let count = 0;
    while (N > 0) {
        count++;
        N = Math.floor(N / 10);  // Math.floor() is used to round off the number to the nearest integer  
    }
    return count
}

console.log(count_Digits(1234))  // 4