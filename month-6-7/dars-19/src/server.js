import express from 'express';
import { createServer } from 'http';
import fileUpload from 'express-fileupload';
import ejs from 'ejs';
import path from 'path';
import { Server } from 'socket.io';
import jwt from './utils/jwt.js';
import { read, write } from './utils/model.js';


import userRouter from './routers/user.router.js';
import messageRouter from './routers/message.router.js';


const app = express();
app.use(express.json());
app.use(fileUpload());

app.use( userRouter );
app.use( messageRouter );


app.engine('html',ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.resolve('src', 'views'));
app.use( express.static(path.resolve('src', 'public')) )
app.use( express.static(path.resolve('uploads')));



const httpServer = createServer(app);
const io = new Server(httpServer);

app.get('/', (req, res) => res.render('index'))
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));



io.on('connection', (socket) => {
  const { token } = socket.handshake.auth
  try {
    
    if(!token){
      socket.emit('exit')
    }

    let { userId } = jwt.verify(token)
    if(userId){
      let users = read('users')
      let user = users.find(user => user.userId == userId)
      user.socketId = socket.id
      write('users', users)
  
      socket.broadcast.emit('user-online', userId)
    }

    // socket.on('send-message', ( {message, created_at}) => {
    //   let messages = read('messages');
    //   let newMessage = {
    //     messageId: messages.at(-1).messageId + 1 || 1,
    //     userId: userId,
    //     message,
    //     created_at
    //   }

    //   messages.push(newMessage)
    //   write('messages', messages);
    // });



    socket.on('disconnect', () => {
      let users = read('users');
      let user = users.find((user) => user.userId == userId);
      user.socketId = null;
      write('users', users);  
      socket.broadcast.emit('user-disconnect', userId);
    })



  } catch (error) {
    socket.emit('exit');
  }
});


httpServer.listen(3000, () => console.log('server ready at *3000'))
