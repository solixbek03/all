import express from 'express';
import fileUpload from 'express-fileupload';
import { PORT, accessLogStream } from './config.js';
import errorHandler from './middlewares/errorHandler.js';
import morgan from 'morgan';
import cors from 'cors';

import userRouter from './routers/user.router.js';
import videoRouter from './routers/video.router.js';
import swaggerRouter from './swagger.js'

const app = express();
app.use(fileUpload());
app.use(express.json());
app.use(cors());
app.use(
  morgan('combined', {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
    stream: accessLogStream,
  })
);

app.use('/api-docs', swaggerRouter)
app.use(userRouter);
app.use(videoRouter);

app.use(errorHandler);
app.listen(PORT, () => console.log(PORT));