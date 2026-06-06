// Decimal to Binary: Number can be an integer or a decimal.
// We need to convert it into a binary number as a string.
const decimalToBinary = (n: number): string => {
  let integerPart = Math.floor(n);
  let fractionalPart = n - integerPart;
  let res = '';

  // Convert integer part to binary
  if (integerPart === 0) {
    res = '0';
  } else {
    while (integerPart > 0) {
      res = (integerPart % 2) + res;
      integerPart = Math.floor(integerPart / 2);
    }
  }

  // Convert fractional part to binary
  if (fractionalPart > 0) {
    res += '.';
    let i = 0;
    while (fractionalPart > 0 && i < 32) {
      fractionalPart *= 2;
      res += Math.floor(fractionalPart);
      fractionalPart -= Math.floor(fractionalPart);
      i++;
    }
  }

  return res;
};

console.log(decimalToBinary(10));     // "10111101110011"
console.log(decimalToBinary(0.625));    // "1010.101"
