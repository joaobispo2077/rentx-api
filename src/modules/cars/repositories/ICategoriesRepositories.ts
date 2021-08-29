import { Category } from '../models/Category';

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export interface ICategoriesRepository {
  findByName: (name: string) => Category | undefined;
  list: () => Category[];
  create: ({ name, description }: ICreateCategoryDTO) => Category;
}
