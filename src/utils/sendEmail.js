import { EMAIL_DELAY } from '../../config';

import buildEmail from './buildEmail';

export default job => new Promise((resolve) => {
  console.log('send_email !', job.id);
  const email = buildEmail(job.data);
  return setTimeout(resolve, EMAIL_DELAY);
});
