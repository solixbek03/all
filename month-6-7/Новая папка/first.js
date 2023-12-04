

const http = require('http');
const fs = require('fs');
const path = require('path');
// const Express = require('./lib/express')


const users = {
  id:13,
  salom:23
}

const server = http.createServer( (req, res) => {
  console.log(req.url);
  console.log(req.method);
  if (req.url == '/post' && req.method == 'GET') {
    res.end(JSON.stringify(users))
  }
})

// function httpfunc (req, res) {
//   const app = new Express(req, res)
  
//   app.engine('views')

//   app.get('/users', (req, res) => {
//     res.end('users')
//   })
// }

// const server = http.createServer(httpfunc)

server.listen(3500, () => console.log('d'))































// const fs = require('fs')
// const path = require('path')




// function project(ww) {
//     fs.mkdir(ww, (err) => {
//         fs.mkdir(path.join(__dirname, `/${ww}`, 'leb'), (err) => {
//             fs.writeFile(path.join(__dirname, `/${ww}/leb`, 'postgres.js'), 'log', (err) => {
//                 console.log(err);
//             })
//             fs.writeFile(path.join(__dirname, `/${ww}/leb`, 'jwt.js'), 'log', (err) => {
//                 console.log(err);
//             })
//         })
//         fs.mkdir(path.join(__dirname, `/${ww}`, 'controll'), (err) => {
//             fs.writeFile(path.join(__dirname, `/${ww}/controll`, 'user.js'), 'log', (err) => {
//                 console.log(err);
//             })
//         })
//         fs.mkdir(path.join(__dirname, `/${ww}`, 'routes'), (err) => {
//             fs.writeFile(path.join(__dirname, `/${ww}/routes`, 'user.js'), 'log', (err) => {
//                 console.log(err);
//             })
//         })
//         fs.writeFile(('config.js'), 'log', (err) => {
//             console.log(err);

//         })
//         fs.writeFile(('configdnod.js'), 'log', (err) => {
//             console.log(err);

//         })
//     })


//     fs.writeFile(path.join(__dirname, `/${ww}`, 'sever.js'), 'log', (err) => {
//         console.log(err);

//     })

//     fs.writeFile(path.join(__dirname, `/${ww}`, 'context.js'), 'log', (err) => {
//         console.log(err);

//     })

// }
// project('fce')






// class char extends String {
//   constructor (value){
//     if(typeof value != 'string') throw new TypeError('dwadawd')
//     if(value != 1) throw new TypeError('knjbhhvgf')
    
//   }

// }

// const char = new char







































































// class Rgb {
//   blue
//   green
//   red
  
//   constructor(blue, green, red) {
//     this.blue = this.#validate(blue);
//     this.green =this.#validate(green);
//     this.red = this.#validate(red);
//   }
//   #validate(str) {
//     return typeof str === 'number' &&  str <= 255 && Number.isFinite(str)  ? str : 0;
//   }
  
//   // setValue (key, str) {
//   //   this[key] = this.#validate(str) || this[key];
//   // }
//   // set red (str) {
//   //   this.setValue('red', str)
//   // }
//   // set green (str) {
//   //   this.setValue('red', str)
//   // }
//   // set blue (str) {
//   //   this.setValue('red', str)
//   // }

//   // set setColors ([red, green, blue]) {
//   //   this.red = red
//   //   this.green = green
//   //   this.blue =blue
//   // }
// }



// const lion = new Rgb(12, 1.3, 13);

// console.log(lion);
// console.log(typeof Number)












// const data = [
//   {income : 500, expanse: 200},
//   {income : 400, expanse: 200},
//   {income : 150, expanse: 145},
//   {income : 230, expanse: 120},
// ]

// function finance (data, str) {
//   data.reduce( (acc, el) => el[str] ? acc += el[str] : 0, 0)
// }

// console.log(finance(data, 'income'));


























// function toOnject (str) {
//   const obj = {}
//   for(let key of str) {
//     if(!obj[key]) obj[key] =1
//     else if(obj[key]) obj[key] += 1
//   }
//   return obj
// }
// console.log(
//   toOnject('salom'));

// console.log(toOnject(salom));


























// // const arr = [
// //   ['name', 'ali'],
// //   ['age', 11],
// //   ['gender', 'male'],
// //   ['email']
// // ]


// // const obj = {}

// // for (let [key, value] of arr ) {
// //   obj[key] = [value] || null
// // }
// // console.log(obj);

// const obj = {
//   name:'ali',
//   age:'11'
// }

// const arr = []

// for (key in obj) {
//   // arr.push([key, obj[key]])
//   arr[arr.length] = [key, obj[key]]
// }
// console.log(arr);
