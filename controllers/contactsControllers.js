// import contactsService from '../services/contactsServices.js';
// const contactsService = require('../services/contactsServices');

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
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOneContact = (req, res) => {};

export const deleteContact = (req, res) => {};

export const createContact = (req, res) => {};

export const updateContact = (req, res) => {};
