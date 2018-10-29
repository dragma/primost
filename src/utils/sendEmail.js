import buildEmail from './buildEmail';
import SES from '../services/SES';
import logger from './consumerLogger';

import { EMAIL_DELAY } from '../../config';

export default job => new Promise((resolve) => {
  const mail = buildEmail(job.data);

  return mail.compile().build((err, message) => {
    SES
      .sendRawEmail({ RawMessage: { Data: message } })
      .promise()
      .then(() => {
        logger(job.data);
        setTimeout(resolve, EMAIL_DELAY);
      })
      .catch(() => {
        logger(job.data, true);
        setTimeout(resolve, EMAIL_DELAY);
      });
  });
});
