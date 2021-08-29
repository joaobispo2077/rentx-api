import { Category } from '../models/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from './ICategoriesRepositories';

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  list(): Category[] {
    return this.categories;
  }

  create({ name, description }: ICreateCategoryDTO): Category {
    const newCategory: Category = new Category(name, description, new Date());

    this.categories.push(newCategory);

    return newCategory;
  }

  findByName(name: string): Category | undefined {
    return this.categories.find((category) => category.name === name);
  }
}

export { CategoriesRepository };
