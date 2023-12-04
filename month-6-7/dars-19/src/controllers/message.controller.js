import { read, write } from '../utils/model.js';
import path from 'path';

const GET = (req, res) => {
  try {
    let messages = read('messages')
    let users = read('users').filter(user => delete user.password)

    messages = messages.map(message => {
      message.from = users.find(user => user.userId == message.from) 
      // message.from = users.find(user => user.userId == message.to)
      console.log(message);
      return message
    })

    res.status(200).json({ status: 200, message: "ok", data: messages });

  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};



export default {
  GET,
};
