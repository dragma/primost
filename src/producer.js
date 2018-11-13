import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import uuid from 'uuid';

import decode from './utils/decode';
import formatData from './utils/formatEmailData';
import checkData from './utils/checkEmailData';
import queue from './utils/queueEmailMiddleware';

import logger from './utils/producerLogger';

import {
  NODE_ENV, PORT, END_POINT,
} from '../config';

const app = express();

// body parser config
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

// cors config
app.use(cors());

app.use((req, res, next) => {
  req.id = uuid.v4();
  next();
});

// morgan configuration
if (NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.post(END_POINT, decode, formatData, checkData, logger, queue);

app.listen(PORT, () => console.log(`[SERVER] is running at port ${PORT}`));
