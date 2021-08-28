import { Router } from 'express';

import { categoriesRoutes } from './categories.routes';

const routes = Router();

routes.use(categoriesRoutes);

export { routes };
