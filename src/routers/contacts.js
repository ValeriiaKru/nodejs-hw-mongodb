import { Router } from 'express';
import express from 'express';
import { authenticate } from '../middlewares/authenticate.js';

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
router.use(authenticate);

router.get('/', ctrlWrapper( getAllContactsController));


router.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/',
  jsonParser,
   authenticate,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
   jsonParser,
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);

router.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController));

export default router;