// first method
let n1 = 1000000
let res = 0
while (n1 > 0) {
  let d = n1 % 10
  res = res * 10 + d
  n1 = Math.floor(n1 / 10)
}
console.log(res)

//second  Method
let n2 = 10000000002342
let new_n = n2.toString()
console.log(Number(new_n.split('').reverse().join('')))
