
import { EMAIL_KEYS_MAPPING } from '../../config';

const formatData = (data) => {
  const keys = Object.keys(data);
  return keys.reduce((acc, key) => {
    const customKey = EMAIL_KEYS_MAPPING[key] || key;

    acc[customKey] = data[key];

    return acc;
  }, {});
};


const format = (req, res, next) => {
  const data = Object.assign({}, req.body);
  req.emailData = formatData(data);
  next();
};

export default format;
