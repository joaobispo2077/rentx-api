import { Category } from '../models/Category';
import { CategoriesRepository } from '../repositories/CategoriesRepository';

interface IPayload {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute({ name, description }: IPayload): Category {
    const isCategoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (isCategoryAlreadyExists) {
      throw new Error('Category already exists.');
    }

    const newCategory = this.categoriesRepository.create({ name, description });

    return newCategory;
  }
}

export { CreateCategoryService };
