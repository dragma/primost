import { malformed as malformedError } from './errors';

import { EMAIL_KEYS_MAPPING } from '../../config';

const TO_CUSTOM = Object.keys(EMAIL_KEYS_MAPPING)
  .reduce((acc, key) => {
    acc[EMAIL_KEYS_MAPPING[key]] = key;
    return acc;
  }, {});

const REQUIRED_FIELDS = [
  'subject',
  'from',
  'to',
  'msg_raw',
  'msg_hml',
];

const check = (req, res, next) => {
  const { emailData } = req;

  const missings = REQUIRED_FIELDS
    .map((field) => {
      if (!emailData[field]) {
        return TO_CUSTOM[field];
      }
      return null;
    })
    .filter(o => !!o);

  if (missings.length) {
    return next(malformedError(missings));
  }
  return next();
};

export default check;
