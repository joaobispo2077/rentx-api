import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { Category } from '@modules/cars/entities/Category';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

interface IPayload {
  name: string;
  description: string;
}
@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ name, description }: IPayload): Promise<Category> {
    const isCategoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    );

    if (isCategoryAlreadyExists) {
      throw new AppError('Category already exists.');
    }

    const newCategory = this.categoriesRepository.create({ name, description });

    return newCategory;
  }
}

export { CreateCategoryUseCase };
