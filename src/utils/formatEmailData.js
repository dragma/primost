
import { EMAIL_KEYS_MAPPING, ATTACHMENTS_KEYS_MAPPING } from '../../config';


const formatAttachments = (data) => {
  const keys = Object.keys(data);
  const temp = keys.reduce((acc, key) => {
    const customKey = ATTACHMENTS_KEYS_MAPPING[key] || key;
    acc[customKey] = data[key];

    return acc;
  }, {});
  return temp;
};


const formatEmailData = (data) => {
  const keys = Object.keys(data);
  return keys.reduce((acc, key) => {
    const customKey = EMAIL_KEYS_MAPPING[key] || key;

    if (customKey !== 'attachments') {
      acc[customKey] = data[key];
    } else {
      acc[customKey] = data[key].map(formatAttachments);
    }

    return acc;
  }, {});
};


const format = (req, res, next) => {
  const data = Object.assign({}, req.body);
  req.emailData = formatEmailData(data);
  next();
};

export default format;
