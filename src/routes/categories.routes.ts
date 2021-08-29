import { Router } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/categories', (request, response) => {
  const { name, description } = request.body;

  const newCategory = categoriesRepository.create({ name, description });

  return response.status(201).json(newCategory);
});

categoriesRoutes.get('/categories', (request, response) => {
  const categories = categoriesRepository.list();

  return response.json(categories);
});

export { categoriesRoutes };
