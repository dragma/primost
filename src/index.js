import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import createLogStream from './utils/logStream';

import {
  NODE_ENV, APP_PORT, ENTRY_POINT, LOG_IN_FILE,
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
  const logStream = createLogStream();
  app.use(morgan('combined', { stream: logStream }));
}

app.post(ENTRY_POINT, (req, res) => res.send('OK'));

app.listen(APP_PORT, () => console.log(`[SERVER] is running at port ${APP_PORT}`));
