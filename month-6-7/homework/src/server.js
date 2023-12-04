import  express  from "express"
import http from "http"; 
import { Server } from "socket.io";
import ejs from 'ejs'
import path from "path";
import { read } from "./utils/model.js";


const app = express()
const httpServer =http.createServer(app)


app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.set('views', path.resolve('src', 'views'))
app.use(express.static(path.resolve('src', 'public')));

app.get('/', (req, res) => res.render('index'));
app.get('/authRedirect', (res, req) => {
  res.redirect('/')
})
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));

const io = new Server(httpServer)

io.on("connection", (socket) => {
  const {username} = socket.handshake.auth
  const users = read('users')
  if(username) {
    users[username] = socket.id
    socket.emit('new-user',   users);
    socket.broadcast.emit('new-user', users)
  }
  socket.on('new-message',  ({to, message}) => {
    io.to(users[to]).emit('send-message',  {from: username,  message: message})
  })

  socket.on('typing', ({to}) => {
    io.to(users[to]).emit('typing', {from:username});
  });

  socket.on('stop', ({ to }) => {
    io.to(users[to]).emit('stop', {from: username});
  });
});








app.listen(5000, () => console.log("5000"))