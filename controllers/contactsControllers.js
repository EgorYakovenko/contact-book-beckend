// import contactsService from '../services/contactsServices.js';
const contactsService = require('../services/contactsServices');

export const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

export const getOneContact = (req, res) => {};

export const deleteContact = (req, res) => {};

export const createContact = (req, res) => {};

export const updateContact = (req, res) => {};
