import { Router } from 'express';

import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();

categoriesRoutes.post('/categories', (request, response) =>
  createCategoryController.handle(request, response),
);

categoriesRoutes.get('/categories', (request, response) =>
  listCategoriesController.handle(request, response),
);

export { categoriesRoutes };
