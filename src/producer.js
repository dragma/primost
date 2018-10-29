import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import createLogStream from './utils/logStream';
import decode from './utils/decode';
import formatData from './utils/formatEmailData';
import checkData from './utils/checkEmailData';
import queue from './utils/queueEmail';

import {
  NODE_ENV, PORT, END_POINT, LOG_IN_FILE,
} from '../config';

const app = express();

// body parser config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors config
app.use(cors());

// morgan configuration
if (NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
if (LOG_IN_FILE) {
  const logStream = createLogStream('producer.log');
  app.use(morgan('combined', { stream: logStream }));
}

app.post(END_POINT, decode, formatData, checkData, queue);

app.listen(PORT, () => console.log(`[SERVER] is running at port ${PORT}`));
