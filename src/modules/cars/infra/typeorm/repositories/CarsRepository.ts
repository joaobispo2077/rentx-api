import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    brand,
    daily_rate,
    category_id,
    description,
    fine_amount,
    license_plate,
  }: ICreateCarDTO): Promise<Car> {
    const newCar = this.repository.create({
      name,
      brand,
      daily_rate,
      category_id,
      description,
      fine_amount,
      license_plate,
    });

    await this.repository.save(newCar);

    return newCar;
  }

  findByLincensePlate(license_plate: string): Promise<Car | undefined> {
    return this.repository.findOne({
      where: { license_plate },
    });
  }
}

export { CarsRepository };
