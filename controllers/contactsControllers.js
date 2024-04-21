import HttpError from '../helpers/HttpError.js';
import wrapper from '../helpers/wrapper.js';

import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
} from '../services/contactsServices.js';

export const getAllContacts = wrapper(async (req, res) => {
  const result = await listContacts();
  res.json(result);
});

export const getOneContact = wrapper(async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
});

export const deleteContact = wrapper(async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
});

export const createContact = wrapper(async (req, res) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
});

export const updateContact = wrapper(async (req, res) => {
  const { id } = req.params;
  const result = await updateContactById(id, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
});
