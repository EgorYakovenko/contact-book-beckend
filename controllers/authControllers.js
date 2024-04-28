import { User } from '../schemas/user.js';

import HttpError from '../helpers/HttpError.js';
import wrapper from '../helpers/wrapper.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { SECRET_KEY } = process.env;
console.log(SECRET_KEY);
// const SECRET_KEY = 'sfsdfsgKSDjshgfjsdSJDGFSJHgf';

export const register = wrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    email: newUser.email,
    password: newUser.password,
  });
});

export const login = wrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

  res.json({ token });
});
