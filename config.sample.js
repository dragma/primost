const config = {
  NODE_ENV: 'dev', // or 'production'
  APP_PORT: 3000, // or any port you'd like
  ENTRY_POINT: '/', // or any route you want ie: /email/receive
  LOG_IN_FILE: true,
  LOG_DIRECTORY: 'log',

  // email configuration
  EMAIL_KEYS_MAPPING: {
    priority: 'priority',
    sujet: 'subject',
    from: 'from',
    fromName: 'fromName',
    replyto: 'replyTo',
    returnPath: 'returnPath',
    to: 'to',
    msg_raw: 'text',
    msg_html: 'html',
    cc: 'cc',
    bcc: 'cci',
    pj: 'attachments',
  },
  ATTACHMENTS_KEY_MAPPING: {
    nom: 'filename',
    url: 'path',
    contentType: 'contentType',
  },
  EMAIL_DELAY: 100, // delay between 2 jobs, in ms

  // redis configration
  REDIS_HOST: 'localhost',
  REDIS_PORT: 6379,
  REDIS_PASSWORD: false,
};

module.exports = config;
