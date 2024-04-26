import HttpError from '../helpers/HttpError.js';
import wrapper from '../helpers/wrapper.js';

import { Contact } from '../schemas/contact.js';

export const getAllContacts = wrapper(async (req, res) => {
  const result = await Contact.find();
  res.json(result);
});

export const getOneContact = wrapper(async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findOne({ _id: id });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
});

export const deleteContact = wrapper(async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
});

export const createContact = wrapper(async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
});

export const updateContact = wrapper(async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
});

export const updateStatusContact = wrapper(async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
});
