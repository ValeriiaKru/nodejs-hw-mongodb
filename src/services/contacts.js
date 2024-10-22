import { ContactsCollection } from '../db/models/contacts.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();
  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const contactsCount = await ContactsCollection.countDocuments(contactsQuery);
  const total = Math.ceil(contactsCount / perPage);
  const data = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });
  return {
    data,
    page,
    perPage,
    totalItems: contactsCount,
    totalPages: total,
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