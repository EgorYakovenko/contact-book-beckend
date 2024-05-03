import { User } from '../schemas/user.js';

import HttpError from '../helpers/HttpError.js';
import wrapper from '../helpers/wrapper.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import gravatar from 'gravatar';
import path from 'node:path'
import fs from "fs/promises";
import Jimp from 'jimp';

const avatarsDir = path.resolve("public", "avatars");

export const register = wrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
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

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: '23h',
  });
  await User.findOneAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
});

export const getCurrent = wrapper(async (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
});

export const logout = wrapper(async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.status(204).end();
});

export const updateAvatar = wrapper(async (req, res) => {
  const {_id} = req.user

  if (!req.file) {
    throw HttpError(400, 'Please add your avatar');
  }

  const {path: tempUpload, originalname} = req.file;
  const filename = `${_id}_${originalname}`
  const resultUpload = path.join(avatarsDir, filename);

  const image = await Jimp.read(tempUpload);
  image.resize(250, 250).writeAsync(tempUpload);
  

  await fs.rename(tempUpload,resultUpload)
  const avatarURL = path.join('avatars', filename)
  await User.findByIdAndUpdate(_id, {avatarURL})
  res.status(200).json({ avatarURL });
});



// Jimp.read(tempUpload, (err, image) => {
//   if (err) throw HttpError(404, err);
//   image.resize(250, 250).write(resultUpload);
// });