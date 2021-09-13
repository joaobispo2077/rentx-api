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
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const newCar = Object.assign(new Car(), {
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      available: true,
      specifications,
    });

    this.cars.push(newCar);

    return newCar;
  }

  async findByLincensePlate(license_plate: string): Promise<Car | undefined> {
    const car = this.cars.find((car) => car.license_plate === license_plate);

    return car;
  }

  async findAvaiable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]> {
    const cars = this.cars.filter(
      (car) =>
        car.available ||
        (brand && brand === car.brand) ||
        (category_id && category_id === car.category_id) ||
        (name && name === car.name),
    );
    return cars;
  }

  async findById(id: string): Promise<Car | undefined> {
    const car = this.cars.find((car) => car.id === id);

    return car;
  }

  async clear(): Promise<void> {
    this.cars = [];
  }
}

export { CarsRepositoryInMemory };
