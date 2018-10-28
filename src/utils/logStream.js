import path from 'path';
import fs from 'fs';
import rfs from 'rotating-file-stream';

import { LOG_DIRECTORY } from '../../config';

// create a rotating write stream
const createAccessLogStream = () => {
  const logDirectory = path.join(__dirname, '..', '..', LOG_DIRECTORY);

  // ensure log directory exists
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }
  return rfs('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory,
    compress: 'gzip',
    size: '10M',
  });
};

export default createAccessLogStream;
