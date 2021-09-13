import { inject, injectable } from 'tsyringe';

import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository';

interface IPayload {
  car_id: string;
  image_names: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImageRepository')
    private carsImageRepository: ICarsImageRepository,
  ) {}
  async execute({ car_id, image_names }: IPayload): Promise<CarImage[]> {
    const createdImages = await Promise.all(
      image_names.map(async (image_name) => {
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
