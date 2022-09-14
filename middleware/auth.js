import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { jwtConfig } from '../config/config.js';

const auth = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(StatusCodes.FORBIDDEN).json({ error: 'Unauthenticated', message: 'token is missing in the request.' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedData = jwt.verify(token, `${jwtConfig.secret}`);
    // eslint-disable-next-line no-underscore-dangle
    req.userId = decodedData?._id;
    next();
  } catch (e) {
    return res.status(StatusCodes.FORBIDDEN).json({ error: e });
  }
};

export default auth;
