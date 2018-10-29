import moment from 'moment';

import { producerLogger as logger } from './logger';

export default (req, res, next) => {
  logger.info(`${req.emailData.id} ${moment().format('YYYY-MM-DD-HH-mm')} ${req.emailData.to} "${req.emailData.subject}"`);
  next();
};
