// const fs = require('fs/promises');
// const path = require('path');
// const { nanoid } = require('nanoid');

import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

import contactsData from '../db/contacts.json' assert { type: 'json' };

// const contactsPath = path.join(__dirname, 'db', 'contacts.json');
// console.log(contactsPath);

export async function listContacts() {
  const contacts = await fs.readFile(contactsData);
  return JSON.parse(contacts);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === contactId);
  console.log(result);
  return result || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(contact => contact.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  const [result] = contacts.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...name,
    ...email,
    ...phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// };
