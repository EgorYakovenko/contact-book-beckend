import express from 'express';

export const authUserRouter = express.Router();

import { validateBody } from '../helpers/validateBody.js';
import { authenticate } from '../helpers/authenticate.js';
import { registerSchema, loginSchema } from '../schemas/user.js';
import {
  register,
  getCurrent,
  logout,
} from '../controllers/authControllers.js';
import { login } from '../controllers/authControllers.js';

authUserRouter.post('/users/register', validateBody(registerSchema), register);

authUserRouter.post('/users/login', validateBody(loginSchema), login);

authUserRouter.get('/users/current', authenticate, getCurrent);

authUserRouter.post('/users/logout', authenticate, logout);
