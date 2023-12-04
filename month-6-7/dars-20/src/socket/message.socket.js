import { read, write } from '../utils/model.js';

export default (io, socket) => {

  socket.on('new-message', ({to, message, created_at}) => {
    let messages = read('messages')
    let users = read('users');


    let newMessage = {
      messageId: messages.at(-1)?.messageId + 1 || 1,
      to, message, created_at, from: socket.userId
    }

    messages.push(newMessage)
    write('messages', messages)

    newMessage.to = users.find(user => user.userId == to)
    newMessage.from = users.find((user) => user.userId == socket.userId);


    io.to(newMessage.to?.socketId).emit('send-message', newMessage)

  })


  socket.on('typing', ({to}) => {
    let users = read('users')
    let user = users.find(user => user.userId == to)

    io.to(user?.socketId).emit('typing');
  })

  socket.on('stop', ({ to }) => {
    let users = read('users');
    let user = users.find((user) => user.userId == to);

    io.to(user?.socketId).emit('stop');
  });

};
