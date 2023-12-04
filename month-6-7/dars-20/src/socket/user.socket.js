import jwt from '../utils/jwt.js';
import { read, write } from '../utils/model.js';

export default (io, socket) => {
  const { token } = socket.handshake.auth;
  try {
    if (!token) {
      socket.emit('exit');
    }

    let { userId } = jwt.verify(token);
    if (userId) {
      let users = read('users');
      let user = users.find((user) => user.userId == userId);
      user.socketId = socket.id;
      write('users', users);

      socket.broadcast.emit('user-online', userId);
      socket.userId = userId;
    }

    socket.on('disconnect', () => {
      let users = read('users');
      let user = users.find((user) => user.userId == userId);
      user.socketId = null;
      write('users', users);
      socket.broadcast.emit('user-disconnect', userId);
    });
  } catch (error) {
    socket.emit('exit');
  }
};
