// import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IPayload {
  name: string;
  brand: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  category_id: string;
}

// @injectable()
class CreateCarUseCase {
  constructor(
    // @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    name,
    brand,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    category_id,
  }: IPayload): Promise<unknown> {
    const car = {
      name,
      brand,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      category_id,
    };

    const newCar = await this.carsRepository.create(car);

    return newCar;
  }
}

export { CreateCarUseCase };
