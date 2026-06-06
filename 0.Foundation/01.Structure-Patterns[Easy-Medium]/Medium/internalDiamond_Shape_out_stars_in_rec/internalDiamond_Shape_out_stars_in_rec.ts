const n: number = 20;
let res: string = ''

for (let i: number = 1; i <= n; i++) {
  //add leading starts
  // 1,2,3,4,5 --> 6,7,8,9,10
  // 5,4,3,2,1 --> 1,2,3,4,5
  const leadingStars = i > (n / 2) ? i - (n / 2) : (n / 2 + 1) - i;
  for (let j = 1; j <= leadingStars; j++) {
    res += '*'
  }

  // add spaces
  // 1,2,3,4,5 --> 6,7,8,9,10
  // 0,2,4,6,8 --> 8,6,4,2,0
  const spaces: number = i > (n / 2) ? (n - 2 * (i - n / 2)) : 2 * (i - 1);
  for (let k = 1; k <= spaces; k++) {
    res += ' '
  }

  // add trailing stars
  // 1,2,3,4,5 --> 6,7,8,9,10
  // 5,4,3,2,1 --> 1,2,3,4,5
  const trailingStars = i > (n / 2) ? i - (n / 2) : (n / 2 + 1) - i;
  for (let l = 1; l <= trailingStars; l++) {
    res += '*'
  }


  // new line
  res += '\n'

}

console.log(res)

export { }
