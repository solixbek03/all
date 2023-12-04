import express from 'express';
import { createServer } from 'http';
import fileUpload from 'express-fileupload';
import ejs from 'ejs';
import path from 'path';
import { Server } from 'socket.io';

import userRouter from './routers/user.router.js';
import messageRouter from './routers/message.router.js';
import socketModule from './socket/index.js'


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
socketModule(io)


httpServer.listen(3000, () => console.log('server ready at *3000'))
