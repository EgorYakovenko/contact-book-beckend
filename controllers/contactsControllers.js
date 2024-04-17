// import contactsService from '../services/contactsServices.js';
// const contactsService = require('../services/contactsServices');

import HttpError from '../helpers/HttpError.js';
import { createContactSchema } from '../schemas/contactsSchemas.js';

import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from '../services/contactsServices.js';

export const getAllContacts = async (req, res) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: 'Server error' });
  }
};

export const getOneContact = async (req, res, next) => {
  // console.log(res.message);
  try {
    const { id } = req.params;
    const result = await getContactById(id);
    if (!result) {
      throw HttpError(404);
      // throw HttpError(404, 'Not found');
      // return res.status(404).json({ message: 'Not found' });
    }
    res.json(result);
  } catch (error) {
    next(error);
    // const { status = 500, message = 'Server error' } = error;
    // res.status(status).json({ message });
  }
};

export const deleteContact = (req, res) => {};

export const createContact = async (req, res, next) => {
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = (req, res) => {};
