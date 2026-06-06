// Note this program works for single digit numbers only.
let n = 9
let res = ''

for (let i = 1; i <= n; i++) {
  // left portion
  for (let j = 1; j <= i; j++) {
    res += j
  }

  // Spacing
  let spaceCount = 2 * (n - i)
  for (let l = 1; l <= spaceCount; l++) {
    res += ' '
  }

  // right portion
  for (let k = i; k >= 1; k--) {
    res += k
  }
  res += '\n'
}
console.log(res)
