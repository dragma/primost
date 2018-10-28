import emailQueue from './utils/emailQueue';
import sendEmail from './utils/sendEmail';

emailQueue.process('send_email', sendEmail);
