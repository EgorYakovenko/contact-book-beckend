import express from 'express';
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from '../controllers/contactsControllers.js';

import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from '../schemas/contact.js';

import { validateBody } from '../helpers/validateBody.js';
import { emptyBody } from '../helpers/emptyBody.js';
import { authenticate } from '../helpers/authenticate.js';

const contactsRouter = express.Router();

contactsRouter.get('/', authenticate, getAllContacts);

contactsRouter.get('/:id', authenticate, getOneContact);

contactsRouter.delete('/:id', authenticate, deleteContact);

contactsRouter.post(
  '/',
  authenticate,
  validateBody(createContactSchema),
  createContact
);

contactsRouter.put(
  '/:id',
  authenticate,
  emptyBody,
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  '/:id/favorite',
  authenticate,
  validateBody(updateFavoriteSchema),
  updateStatusContact
);

export default contactsRouter;
