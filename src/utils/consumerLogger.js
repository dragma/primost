import moment from 'moment';

import { consumerLogger as logger } from './logger';

export default (emailData, error = false) => {
  logger.info(`${(!error && 'ok') || 'error'} ${emailData.id} ${moment().format('YYYY-MM-DD-HH-mm')} ${emailData.to} "${emailData.subject}"`);
};
