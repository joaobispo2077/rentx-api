import { inject, injectable } from 'tsyringe';

import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository';
import { IStorageProvider } from '@shared/containers/providers/StorageProvider/IStorageProvider';

interface IPayload {
  car_id: string;
  image_names: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImageRepository')
    private carsImageRepository: ICarsImageRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}
  async execute({ car_id, image_names }: IPayload): Promise<CarImage[]> {
    const createdImages = await Promise.all(
      image_names.map(async (image_name) => {
        await this.storageProvider.save(image_name, 'cars');
        return await this.carsImageRepository.create({
          car_id,
          image_name,
        });
      }),
    );

    return createdImages;
  }
}

export { UploadCarImagesUseCase };
