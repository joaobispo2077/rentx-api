import { Category } from '../../models/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepositories';

interface IPayload {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IPayload): Category {
    const isCategoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (isCategoryAlreadyExists) {
      throw new Error('Category already exists.');
    }

    const newCategory = this.categoriesRepository.create({ name, description });

    return newCategory;
  }
}

export { CreateCategoryUseCase };
