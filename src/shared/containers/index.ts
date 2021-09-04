import { container } from 'tsyringe';

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepositories';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);
