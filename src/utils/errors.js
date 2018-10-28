import createError from 'http-errors';

const malformed = fields => createError(
  400,
  `Missing required email fields : ${fields.map(f => `"${f}"`).join(',')}`,
);

const wrongToken = () => createError(
  400,
  'Wrong token',
);

export { malformed, wrongToken };
