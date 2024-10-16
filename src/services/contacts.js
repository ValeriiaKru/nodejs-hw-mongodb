import { ContactsCollection } from '../db/models/contact.js';

export async function getAllContacts() {
  const contacts = await ContactsCollection.find();
  return contacts;
}

export async function getContactById(contactId) {
  const contact = await ContactsCollection.findById(contactId);

  return contact;
}

export async function createContact(newContact) {
  const contact = await ContactsCollection.create(newContact);
  return contact;
}

export async function updateContact(contactId, contact) {
  const updatedContact = await ContactsCollection.findOneAndUpdate(
    {
      _id: contactId,
    },
    contact,
    { new: true },
  );
  return updatedContact;
}

export async function deleteContact(contactId) {
  const contact = await ContactsCollection.findByIdAndDelete(contactId);
  return contact;
}