import { Router } from 'express';

import { Category } from '../models/Category';

const categoriesRoutes = Router();

const categories: Category[] = [];

categoriesRoutes.post('/categories', (request, response) => {
  const { name, description } = request.body;

  const newCategory: Category = new Category(name, description, new Date());

  categories.push(newCategory);

  return response.status(201).json(newCategory);
});

export { categoriesRoutes };
