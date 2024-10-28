import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { env } from './utils/env.js';
import cookieParser from 'cookie-parser';
import router from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

dotenv.config();

const PORT = Number(env('PORT', '4000'));

export function setupServer() {
  const app = express();

app.use(router);
  app.use(cors());
  app.use(cookieParser());

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}