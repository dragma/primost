import buildEmail from './buildEmail';
import SES from '../services/SES';
import logger from './consumerLogger';
import queueEmail from './queueEmail';

import {
  EMAIL_DELAY, DELAY_ON_ACKNOWLEDGE, RETRY_ON_THROTTLE, RETRY_DELAY,
} from '../../config';

export default job => new Promise((resolve) => {
  const mail = buildEmail(job.data);

  return mail.compile().build((err, message) => {
    if (!DELAY_ON_ACKNOWLEDGE) {
      setTimeout(resolve, EMAIL_DELAY);
    }
    SES
      .sendRawEmail({ RawMessage: { Data: message } })
      .promise()
      .then(() => {
        logger(job.data);
        if (DELAY_ON_ACKNOWLEDGE) {
          setTimeout(resolve, EMAIL_DELAY);
        }
      })
      .catch((error) => {
        if (DELAY_ON_ACKNOWLEDGE) {
          setTimeout(resolve, EMAIL_DELAY);
        }
        if (error.statusCode === 454) { // 454 seems to the erro code for Throttling
          logger(job.data, 'retry');
          const { priority } = job.opts;
          if (RETRY_ON_THROTTLE) {
            queueEmail(job.data, priority, RETRY_DELAY);
          }
        } else {
          logger(job.data, 'error');
        }
      });
  });
});
