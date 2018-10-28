import createError from 'http-errors';

const malformed = fields => createError(
  400,
  `Missing required email fields : ${fields.map(f => `"${f}"`).join(',')}`,
);

export { malformed };
