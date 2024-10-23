import { ContactsCollection } from '../db/models/contacts.js';


export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,

}) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactsQuery = ContactsCollection.find();



  const [totalItems, contacts] = await Promise.all([
    ContactsCollection.countDocuments(contactsQuery),
    contactsQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);
   const totalPages = Math.ceil(totalItems / perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: totalPages - page > 0,
  };
};

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