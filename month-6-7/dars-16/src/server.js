import express from 'express';
import { read, write } from './utils/model.js';
import randomNumber from './randomNumber.js';
import mailer from './mail.js';
import jwt from './utils/jwt.js';

const app = express();
app.use(express.json());


app.post('/register', (req, res) => {
  let { username, email } = req.body
  let users = read('users')
  let findUser = users.find((user) => user.email == email);
  if(findUser){
    return res.status(400).json({status: 400, message: 'email exists'})
  }else{
    let newUser = { userId: users.at(-1).userId + 1 || 1, username, email};
    users.push(newUser)
    write('users', users)
    let emails = read('mail')
    if (emails[email]) {
      return res.status(200).json({ status: 200, message: 'your code sent' });
    } else {
      let code = randomNumber();
      emails[email] = code;
      write('mail', emails);
      mailer({
        from: '"super app" <foo@example.com>', // sender address
        to: email, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: `<b>${code}</b>`,
      });
    }
    return res.status(201).json({ status: 201, message: 'your code sent' });
  }
});



app.post('/login', (req, res) => {
  let { email } = req.body;
  let findUser = read('users').find((user) => user.email == email);
  if (findUser) {
    let code = randomNumber();
    let emails = read('mail');
    if( read('mail')[email] ){
      res.status(200).json({ status: 200, message: 'your code sent' });
    }else{
      emails[email] = code;
      write('mail', emails);
      mailer({
        from: '"super app" <foo@example.com>', // sender address
        to: email, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: `<b>${code}</b>`,
      });
      res.status(200).json({ status: 200, message: 'your code sent' });
    }
  } else {
    res.status(400).json({ status: 400, message: 'bad email' });
  }
});



app.post('/verify', (req, res) => {
  let { email, code } = req.body;
  let findUser = read('users').find((user) => user.email == email);
  if (findUser) {
    let emails = read('mail')
    let resultCode = emails[email];
    if (resultCode && resultCode == code) {
      delete emails[email]
      write('mail', emails)
      return res
        .status(200)
        .json({
          status: 200,
          message: 'ok',
          token: jwt.sign({ userId: findUser.userId }),
        });
    }else{
      return res.status(400).json({ status: 400, message: 'invalid code' });
    }
  }else{
    return res.status(400).json({ status: 400, message: 'bad email' });
  }
});

app.listen(5000, () => console.log('server running'));
