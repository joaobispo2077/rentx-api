import csvParse from 'csv-parse';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}
@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

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
          fs.promises.unlink(file.path);
          return resolve(categories);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const loadedCategories = await this.loadCategories(file);

    await Promise.all(
      loadedCategories.map(async ({ name, description }) => {
        const isCategoryAlreadyExists =
          await this.categoriesRepository.findByName(name);

        if (!isCategoryAlreadyExists) {
          await this.categoriesRepository.create({ name, description });
        }
      }),
    );
  }
}
export { ImportCategoryUseCase };
