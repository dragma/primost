const config = {
  NODE_ENV: 'dev', // or 'production'
  PORT: 3000, // or any port you'd like
  END_POINT: '/', // or any route you want ie: /email/receive

  // secret
  JWT_SECRET: 'shhhh',

  // logger configuration
  LOG_IN_CONSOLE: true,
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
  ATTACHMENTS_KEYS_MAPPING: {
    nom: 'filename',
    url: 'path',
    contentType: 'contentType',
  },
  EMAIL_DELAY: 100, // delay between 2 jobs, in ms

  // redis configration
  REDIS_HOST: 'localhost',
  REDIS_PORT: 6379,
  REDIS_PASSWORD: false,

  // AWS configuration
  AWS_ACCESS_KEY_ID: '',
  AWS_SECRET_ACCESS_KEY: '',
  AWS_REGION: '',
};

module.exports = config;
