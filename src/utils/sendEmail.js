import buildEmail from './buildEmail';
import SES from '../services/SES';

import { EMAIL_DELAY } from '../../config';

export default job => new Promise((resolve) => {
  console.log('send_email !', job.id);
  const mail = buildEmail(job.data);

  return mail.build((err, message) => {
    SES
      .sendRawEmail({ RawMessage: { Data: message } })
      .promise()
      .then(() => setTimeout(resolve, EMAIL_DELAY))
      .catch(() => setTimeout(resolve, EMAIL_DELAY));
  });
});
