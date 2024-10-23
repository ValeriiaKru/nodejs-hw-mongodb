import { Router } from 'express';
import express from 'express';

import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';

const router = Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/contacts',
   jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/contacts/:contactId',
   jsonParser,
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);

router.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController));

export default router;