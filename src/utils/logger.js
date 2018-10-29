import path from 'path';
import fs from 'fs';
import winston from 'winston';
import 'winston-daily-rotate-file';

import { LOG_DIRECTORY, LOG_IN_FILE, LOG_IN_CONSOLE } from '../../config';

const createLogger = (filename) => {
  const transports = [];

  if (LOG_IN_FILE) {
    const logDirectory = path.join(__dirname, '..', '..', LOG_DIRECTORY);

    // ensure log directory exists
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }

    const fileName = path.join(__dirname, '..', '..', LOG_DIRECTORY, `${filename}-%DATE%.log`);

    const transport = new (winston.transports.DailyRotateFile)({
      filename: fileName,
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    });

    transports.push(transport);
  }

  if (LOG_IN_CONSOLE) {
    const transport = new winston.transports.Console();

    transports.push(transport);
  }

  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.simple(),
    ),
    transports,
  });


  return logger;
};

export default createLogger;

export const producerLogger = createLogger('producer');
export const consumerLogger = createLogger('consumer');
