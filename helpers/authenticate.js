import jwt from 'jsonwebtoken';

import HttpError from './HttpError.js';

import { User } from '../schemas/user.js';

export const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      next(HttpError(401, 'Not authorized'));
    }
    next();
  } catch (error) {
    next(HttpError(401));
  }
};
