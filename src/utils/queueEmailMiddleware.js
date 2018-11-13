import queueEmail from './queueEmail';

const queue = (req, res) => {
  const {
    priority,
    ...emailData
  } = req.emailData;
  return queueEmail(emailData, priority)
    .then(job => res.status(200).send(`Email ${job.id} queued.`));
};

export default queue;
