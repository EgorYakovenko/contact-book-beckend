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

authUserRouter.post('/register', validateBody(registerSchema), register);

authUserRouter.post('/login', validateBody(loginSchema), login);

authUserRouter.get('/current', authenticate, getCurrent);

authUserRouter.post('/logout', authenticate, logout);
