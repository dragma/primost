import emailQueue from './emailQueue';

const queue = (req, res) => {
  const {
    priority,
    ...emailData
  } = req.emailData;
  return emailQueue
    .add('send_email', emailData, { removeOnComplete: true, priority })
    .then(job => res.status(200).send(`Email ${job.id} queued.`));
};

export default queue;
