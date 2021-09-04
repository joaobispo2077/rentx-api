import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/ImportCategoryController';
import listCategoriesController from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', (request, response) =>
  listCategoriesController().handle(request, response),
);

const importCategoryController = new ImportCategoryController();

const upload = multer({
  dest: './tmp',
});

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
);

export { categoriesRoutes };
