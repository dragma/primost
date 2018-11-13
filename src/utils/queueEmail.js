import emailQueue from './emailQueue';

const queue = (emailData, priority, delay = null) => emailQueue
  .add('send_email', emailData, { removeOnComplete: true, priority, delay });

export default queue;
