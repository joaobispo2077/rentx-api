import { Category } from '../models/Category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoriesRepository {
  private categories: Category[] = [];

  create({ name, description }: ICreateCategoryDTO): Category {
    const newCategory: Category = new Category(name, description, new Date());

    this.categories.push(newCategory);

    return newCategory;
  }
}

export { CategoriesRepository };
