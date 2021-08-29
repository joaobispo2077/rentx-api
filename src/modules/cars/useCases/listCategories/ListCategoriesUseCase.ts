import { Category } from '../../models/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepositories';

class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(): Category[] {
    const categories = this.categoriesRepository.list();
    return categories;
  }
}

export { ListCategoriesUseCase };
