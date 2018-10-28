const config = {
  NODE_ENV: 'dev', // or 'production'
  APP_PORT: 3000, // or any port you'd like
  ENTRY_POINT: '/', // or any route you want ie: /email/receive
  LOG_IN_FILE: true,
  LOG_DIRECTORY: 'log',

  EMAIL_KEYS_MAPPING: {
    priority: 'priority',
    sujet: 'subject',
    from: 'from',
    fromName: 'fromName',
    replyto: 'replyto',
    returnPath: 'returnPath',
    to: 'to',
    msg_raw: 'msg_raw',
    msg_html: 'msg_html',
    cc: 'cc',
    cci: 'cci',
    attachments: 'pj',
  },

  // redis configration
  REDIS_HOST: 'localhost',
  REDIS_PORT: 6379,
  REDIS_PASSWORD: false,
};

module.exports = config;
