import MailComposer from 'nodemailer/lib/mail-composer';

export default (data) => {
  const {
    from,
    to,
    cc,
    bcc,
    replyTo,
    subject,
    text,
    html,
    attachments,
  } = data;
  const mail = new MailComposer({
    from,
    to,
    cc,
    bcc,
    replyTo,
    subject,
    text,
    html,
    attachments,
  });
  return mail;
};
