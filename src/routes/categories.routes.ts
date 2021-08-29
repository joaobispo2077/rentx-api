import { Router } from 'express';

import { Category } from '../models/Category';
import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/categories', (request, response) => {
  const { name, description } = request.body;

  const newCategory = categoriesRepository.create({ name, description });

  return response.status(201).json(newCategory);
});

export { categoriesRoutes };
