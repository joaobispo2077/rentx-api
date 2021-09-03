import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepositories';

interface IPayload {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ name, description }: IPayload): Promise<Category> {
    const isCategoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    );

    if (isCategoryAlreadyExists) {
      throw new Error('Category already exists.');
    }

    const newCategory = this.categoriesRepository.create({ name, description });

    return newCategory;
  }
}

export { CreateCategoryUseCase };
