import { AppError } from '@errors/AppError';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

describe('UseCase - Create Category', () => {
  let createCategoryUseCase: CreateCategoryUseCase;
  let categoriesRepository: CategoriesRepositoryInMemory;

  beforeEach(() => {
    categoriesRepository = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Car category',
      description: 'Car description',
    };

    const newCategory = await createCategoryUseCase.execute(category);

    expect(newCategory).toEqual(expect.objectContaining(category));
  });

  it('should not be able to create a category that already exists', async () => {
    const category = {
      name: 'Car-error-category',
      description: 'Car description',
    };

    await createCategoryUseCase.execute(category);

    await expect(
      createCategoryUseCase.execute(category),
    ).rejects.toBeInstanceOf(AppError);

    await expect(createCategoryUseCase.execute(category)).rejects.toEqual(
      new AppError('Category already exists.', 409),
    );
  });
});
