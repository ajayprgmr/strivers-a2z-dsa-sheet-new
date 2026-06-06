let n = 9
let res = ''
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= i; j++) {
    res += '*'
  }
  //spacing
  for (let j = 1; j <= 2 * n - 2 * i; j++) {
    res += ' '
  }

  for (let j = 1; j <= i; j++) {
    res += '*'
  }

  res += '\n'
}
for (let i = 1; i < n; i++) {
  for (let j = 1; j <= n - i; j++) {
    res += '*'
  }
  //spacing
  for (let j = 1; j <= 2 * i; j++) {
    res += ' '
  }

  for (let j = 1; j <= n - i; j++) {
    res += '*'
  }

  res += '\n'
}

console.log(res)

/*
ouput for n=9

*                *
**              **
***            ***
****          ****
*****        *****
******      ******
*******    *******
********  ********
******************
********  ********
*******    *******
******      ******
*****        *****
****          ****
***            ***
**              **
*                *


*/
