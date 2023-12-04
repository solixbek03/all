
export default () => {
  let min = 10000
  let max = 99999

  return Math.ceil( Math.random() * (max - min) ) + min 
}
