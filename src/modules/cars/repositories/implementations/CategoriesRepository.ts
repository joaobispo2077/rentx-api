import { getRepository, Repository } from 'typeorm';

import { Category } from '../../entities/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  // private static INSTANCE: CategoriesRepository;

  // public static getInstance(): CategoriesRepository {
  //   if (!this.INSTANCE) {
  //     this.INSTANCE = new CategoriesRepository();
  //   }

  //   return this.INSTANCE;
  // }

  async list(): Promise<Category[]> {
    return await this.repository.find();
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const newCategory: Category = this.repository.create({ name, description });

    return await this.repository.save(newCategory);
  }

  async findByName(name: string): Promise<Category | undefined> {
    return await this.repository.findOne({ name });
  }
}

export { CategoriesRepository };
