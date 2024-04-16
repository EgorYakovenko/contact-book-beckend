// import contactsService from '../services/contactsServices.js';
// const contactsService = require('../services/contactsServices');

import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from '../services/contactsServices.js';

import { join } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//=========================================
const contactsData = join(__dirname, 'db', 'contacts.json');

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
