const fs = require("fs/promises");
const path = require("path");
const { v4: uuid } = require("uuid");
// const contactsPath = require('./contacts.json')

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(data);
    return parsedContacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: uuid(), ...body };
    const updatedContacts = [newContact, ...contacts];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
