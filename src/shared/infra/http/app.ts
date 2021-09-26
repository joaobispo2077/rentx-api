import '@config/environment';

import 'reflect-metadata';
import 'express-async-errors';

import '@shared/containers';
import '@shared/containers/providers';

import cors from 'cors';
import express from 'express';
import swaggerUI from 'swagger-ui-express';

import upload from '@config/upload';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';
import createConnection from '@shared/infra/typeorm';

import swaggerFile from '../../../swagger.json';
import { handleError } from './middlewares/handleError';
import { routes } from './routes';

createConnection();

const app = express();

console.log(process.env.SENTRY_DSN);
app.use(rateLimiter); // before tracing errors

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

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

app.use(Sentry.Handlers.errorHandler());

app.use(handleError);

export { app };
