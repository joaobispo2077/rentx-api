import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
  }: ICreateCarDTO): Promise<Car> {
    const newCar = Object.assign(new Car(), {
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
    });

    this.cars.push(newCar);

    return newCar;
  }
}

export { CarsRepositoryInMemory };
