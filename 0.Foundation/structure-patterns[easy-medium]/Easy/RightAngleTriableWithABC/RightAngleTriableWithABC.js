let n = 10
let res = ''

for (let i = 1; i <= n; i++) {
  // Print characters
  for (let j = i; j >= 1; j--) {
    res += String.fromCharCode(65 + n - j) + '\t'
  }

  res += '\n' // New line after each row
}

console.log(res)
