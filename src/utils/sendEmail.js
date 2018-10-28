import { EMAIL_DELAY } from '../../config';

export default job => new Promise((resolve) => {
  console.log('send_email !', job.id);
  return setTimeout(() => resolve(), EMAIL_DELAY);
});
