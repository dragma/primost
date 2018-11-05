import buildEmail from './buildEmail';
import SES from '../services/SES';
import logger from './consumerLogger';

import { EMAIL_DELAY, DELAY_ON_ACKNOWLEDGE } from '../../config';

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
      .catch(() => {
        logger(job.data, true);
        if (DELAY_ON_ACKNOWLEDGE) {
          setTimeout(resolve, EMAIL_DELAY);
        }
      });
  });
});
