import HttpError from '../helpers/HttpError.js';
import wrapper from '../helpers/wrapper.js';

import { Contact } from '../schemas/contact.js';

export const getAllContacts = wrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, '-createdAt', {
    skip,
    limit,
  }).populate('owner', 'subscription email');
  res.json(result);
});

export const getOneContact = wrapper(async (req, res) => {
  const { id: _id } = req.params;
  const { id: owner } = req.user;
  const result = await Contact.findOne({ _id, owner });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
});

export const deleteContact = wrapper(async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndDelete({ _id, owner });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
});

export const createContact = wrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
});

export const updateContact = wrapper(async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate({ _id, owner }, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
});

export const updateStatusContact = wrapper(async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate({ _id, owner }, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
});
