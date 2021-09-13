import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  car_id: string;
  specification_ids: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({ car_id, specification_ids }: IPayload): Promise<Car> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError('Car was not found', 404);
    }

    const specifications = await this.specificationsRepository.findByIds(
      specification_ids,
    );

    car.specifications = specifications;
    const updatedCar = await this.carsRepository.create(car);
    return updatedCar;
  }
}

export { CreateCarSpecificationUseCase };
