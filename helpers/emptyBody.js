import HttpError from './HttpError.js';

export const emptyBody = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return next(HttpError(400, 'Body must have at least one field'));
  }
  next();
};
