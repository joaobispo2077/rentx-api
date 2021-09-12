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
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const newCar = this.repository.create({
      name,
      brand,
      daily_rate,
      category_id,
      description,
      fine_amount,
      license_plate,
      specifications,
    });

    await this.repository.save(newCar);

    return newCar;
  }

  async findById(id: string): Promise<Car | undefined> {
    const car = await this.repository.findOne(id);
    return car;
  }

  findByLincensePlate(license_plate: string): Promise<Car | undefined> {
    return this.repository.findOne({ license_plate });
  }

  async findAvaiable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });

    brand && carsQuery.andWhere('brand = :brand', { brand });
    category_id &&
      carsQuery.andWhere('c.category_id = :category_id', { category_id });
    name && carsQuery.andWhere('c.name = :name', { name });

    const cars = await carsQuery.getMany();
    return cars;
  }
}

export { CarsRepository };
