import { Router } from 'express';

const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post('/categories', (request, response) => {
  const { name, description } = request.body;

  const newCategory = {
    id: categories.length + 1,
    name,
    description,
    created_at: new Date(),
  };

  categories.push(newCategory);

  return response.status(201).json(newCategory);
});

export { categoriesRoutes };
