require('dotenv/config');

import 'reflect-metadata';
import 'express-async-errors';

import '@shared/containers';
import '@shared/containers/providers';

import express from 'express';
import swaggerUI from 'swagger-ui-express';

import createConnection from '@shared/infra/typeorm';

import swaggerFile from '../../../swagger.json';
import { handleError } from './middlewares/handleError';
import { routes } from './routes';

createConnection();
const app = express();
app.use(express.json());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(routes);
app.use(handleError);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server is running at por ${PORT}`));
