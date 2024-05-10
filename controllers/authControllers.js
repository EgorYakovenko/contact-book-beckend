import { User } from '../schemas/user.js';

import HttpError from '../helpers/HttpError.js';
import wrapper from '../helpers/wrapper.js';
import sendEmail from '../helpers/sendEmail.js';
import {sendVerificationEmail} from '../helpers/verifyEmail.js'

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import gravatar from 'gravatar';
import path from 'node:path'
import fs from "fs/promises";
import Jimp from 'jimp';

import { nanoid } from 'nanoid';

const avatarsDir = path.resolve("public", "avatars");

export const register = wrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);


  // const { BASE_URL } = process.env;
  const verificationToken = nanoid();

  await sendVerificationEmail(email,verificationToken);
 

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
});

export const verifyEmail = wrapper(async(req, res)=>{
  const {verificationCode} = req.params;
  const user = await User.findOne({verificationCode})
  if(!user) {
    throw HttpError(404, 'User not found');
  }
  await User.findByIdAndUpdate(user._id, {verify: true, verificationCode:''})
  res.status(200).json({
		message: "Verification successful",
	});
})

export const resendVerifyEmail = wrapper(async(req,res)=> {
  const {email} = req.body;
  const user = await User.findOne({email})
  
  if(user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  await sendVerificationEmail(email, user.verificationToken);
 
  res.json({
		message: "Verify email send",
	});
})

export const login = wrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }

if(!user.verify) {
  throw HttpError(401, "Your account is not verified");
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
  await image.resize(250, 250).writeAsync(tempUpload);
  

  await fs.rename(tempUpload,resultUpload)
  const avatarURL = path.join('avatars', filename)
  await User.findByIdAndUpdate(_id, {avatarURL})
  res.status(200).json({ avatarURL });
});


