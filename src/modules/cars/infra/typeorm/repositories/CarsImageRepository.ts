import { getRepository, Repository } from 'typeorm';

import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository';

import { CarImage } from '../entities/CarImage';

class CarsImageRepository implements ICarsImageRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }
  async create({
    car_id,
    image_name,
  }: {
    car_id: string;
    image_name: string;
  }): Promise<CarImage> {
    const newCarImage = this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(newCarImage);

    return newCarImage;
  }
}

export { CarsImageRepository };
