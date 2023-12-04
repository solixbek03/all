import { read, write } from '../utils/model.js';
import jwt from '../utils/jwt.js';
import path from 'path';

const LOGIN = (req, res) => {
  try {
    const users = read('users');
    let { username, password } = req.body;
    let user = users.find(
      (user) => user.username == username && user.password == password
    );

    if (!user) {
      throw new Error('wrong username or password');
    }

    return res.status(200).json({
      status: 200,
      message: 'ok',
      data: user,
      token: jwt.sign({ userId: user.userId }),
    });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

const REGISTER = (req, res) => {
  try {
    const users = read('users');
    let { username, password } = req.body;
    let { avatar } = req.files;

    let user = users.find((user) => user.username == username);

    if (user) {
      throw new Error('this username exists');
    }
    let fileName = Date.now() + avatar.name.replace(/\s/g, '');
    avatar.mv(path.resolve('uploads', fileName));

    let newUser = {
      userId: users.at(-1).userId + 1 || 1,
      username,
      password,
      avatar: fileName,
    };

    users.push(newUser);
    write('users', users);

    return res.status(201).json({
      status: 201,
      message: 'created',
      data: newUser,
      token: jwt.sign({ userId: newUser.userId }),
    });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

const GET = (req, res) => {
  try {
    const users = read('users').filter((user) => delete user.password);

    let { token } = req.params;

    if (token) {
      const { userId } = jwt.verify(token);
      return res.status(200).json({
        status: 200,
        message: 'ok',
        data: users.find((user) => user.userId == userId),
      });
    } else {
      return res.status(200).json({ status: 200, message: 'ok', data: users});
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

export default {
  LOGIN,
  REGISTER,
  GET,
};
