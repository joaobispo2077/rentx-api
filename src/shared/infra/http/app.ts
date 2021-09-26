import '@config/environment';

import 'reflect-metadata';
import 'express-async-errors';

import '@shared/containers';
import '@shared/containers/providers';

import cors from 'cors';
import express from 'express';
import swaggerUI from 'swagger-ui-express';

import upload from '@config/upload';
import createConnection from '@shared/infra/typeorm';

import swaggerFile from '../../../swagger.json';
import { handleError } from './middlewares/handleError';
import { routes } from './routes';

createConnection();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: '*',
  }),
);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use(routes);
app.use(handleError);

export { app };
