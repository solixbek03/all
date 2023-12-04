
function i(a, b, c , d) {
  let x = +d
  let arg = [...arguments]
  let y = a+b+c+x
  let n = y / arg.length
  let result = Number.isInteger(n)

return !result
}


console.log(i(1, 2,1,true));











// function i(a, b, c) {
//   let resultF = a+c
//   let result = resultF / b
//   let x = Number.isInteger(result)
//   if(x) {
//     return 10
//   } else {
//     return 0
//   }
// }

// console.log(i(9, 1, 0));
