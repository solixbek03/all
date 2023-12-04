
export default ():number => {
  let min:number = 10000
  let max:number = 99999

  return Math.ceil( Math.random() * (max - min) ) + min 
}
