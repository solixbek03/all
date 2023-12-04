import { read, write } from '#model';
import crypto from 'crypto';
import jwt from '../utils/jwt.js';
import path from 'path';
import { BadRequestError, InternalServerError } from '#error';


const LOGIN = (req, res, next) => {
  try {
    let users = read('users');
    let { username, password } = req.body;
    password = crypto.createHash('sha256').update(password).digest('hex');

    let user = users.find(
      (user) => user.username == username && user.password == password
    );

    if (!user) {
      return next(new BadRequestError(400, 'wrong username or password'));
    }

    res.status(200).json({
      status: 200,
      message: 'ok',
      token: jwt.sign({ userId: user.userId }),
    });
  } catch (error) {}
};

const REGISTER = (req, res, next) => {
  try {
    let users = read('users');
    let { username, password } = req.body;
    let { avatar } = req.files;

    let user = users.find((user) => user.username == username);

    if (user) {
      return next(new BadRequestError(400, 'username exists'));
    }

    let fileName = Date.now() + avatar.name.replace(/\s/g, '');
    avatar.mv(path.resolve('uploads', fileName));

    let newUser = {
      userId: users.at(-1)?.userId + 1 || 1,
      username,
      password: crypto.createHash('sha256').update(password).digest('hex'),
      avatar: fileName,
    };

    users.push(newUser);
    write(users, 'users');

    delete newUser.password;

    res.status(201).json({
      status: 201,
      message: 'ok',
      token: jwt.sign({ userId: newUser.userId }),
      data: newUser,
    });

  } catch (error) {
    return next(new InternalServerError(500, 'InternalServerError'));
  }
};

const TOKEN = (req, res, next) => {
  try {
    let { token } = req.query;
    let users = read('users')

    if (!token) {
      return next(new ForbiddenError(403, 'ForbiddenError'));
    }

    let { userId, exp } = jwt.verify(token);

    if(!users.some(user => user.userId == userId)){
      return res.status(400).json({
        status: 400,
        message: error.message,
        tokenExpired: true,
        tokenTimeRemaning: 0,
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'valid token',
      tokenExpired: false,
      tokenTimeRemaning: Math.floor(exp - Date.now() / 1000),
    })

  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
      tokenExpired: true,
      tokenTimeRemaning: 0,
    });
  }
};

const GET = (req, res, next) => {
  try {
    let users = read('users')
    res.send(users)
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
}

export default {
  LOGIN,
  REGISTER,
  TOKEN,
  GET
}
