/*
function generatePyramid(rows) {
  for (let i = 1; i <= rows; i++) {
    let output = ''

    // Add leading spaces for alignment
    for (let j = 1; j <= rows - i; j++) {
      output += '  '
    }

    // Ascending part of the row
    for (let j = 1; j <= i; j++) {
      output += String.fromCharCode(64 + j) + ' '
    }

    // Descending part of the row
    for (let j = i - 1; j >= 1; j--) {
      output += String.fromCharCode(64 + j) + ' '
    }

    console.log(output)
  }
}

// Call the function with the desired number of rows
generatePyramid(8)

*/
let n = 8
let res = ''

for (let i = 1; i <= n; i++) {
  // Adding leading spaces
  for (let j = 1; j <= n - i; j++) {
    res += ' '
  }

  // Printing leading characters (left side of the pyramid)
  for (let k = 1; k < i; k++) {
    res += String.fromCharCode(64 + k)
  }

  // Printing middle character (the peak of the pyramid)
  res += String.fromCharCode(64 + i)

  // Printing trailing characters (right side of the pyramid)
  for (let l = i - 1; l >= 1; l--) {
    res += String.fromCharCode(64 + l)
  }

  // Move to the next line
  res += '\n'
}

console.log(res)
