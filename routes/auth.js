import express from 'express';

export const authUserRouter = express.Router();

import validateBody from '../helpers/validateBody.js';
import { registerSchema, loginSchema } from '../schemas/user.js';
import { register } from '../controllers/authControllers.js';
import { login } from '../controllers/authControllers.js';

authUserRouter.post('/register', validateBody(registerSchema), register);

authUserRouter.post('/login', validateBody(loginSchema), login);
