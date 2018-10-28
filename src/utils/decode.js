import jwt from 'jsonwebtoken';

import { wrongToken } from './errors';

import { JWT_SECRET } from '../../config';

export default (req, res, next) => {
  const { token } = req.body;
  try {
    const decodedData = jwt.verify(token, JWT_SECRET);
    req.body = Object.assign({}, decodedData);
    return next();
  } catch (err) {
    return next(wrongToken());
  }
};
