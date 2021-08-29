import csvParse from 'csv-parse';
import fs from 'fs';

import { Category } from '../../models/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepositories';

interface IImportCategory {
  name: string;
  description: string;
}
class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return await new Promise((resolve, _) => {
      const categories: IImportCategory[] = [];

      const stream = fs.createReadStream(file.path);

      const parseFile = csvParse();
      stream.pipe(parseFile);

      parseFile
        .on('data', async (line) => {
          const [name, description] = line;

          categories.push({
            name,
            description,
          });
        })
        .on('end', () => {
          return resolve(categories);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const loadedCategories = await this.loadCategories(file);

    loadedCategories.forEach(({ name, description }) => {
      const isCategoryAlreadyExists =
        this.categoriesRepository.findByName(name);

      if (!isCategoryAlreadyExists) {
        this.categoriesRepository.create({ name, description });
      }
    });

    console.log(loadedCategories);
  }
}
export { ImportCategoryUseCase };
