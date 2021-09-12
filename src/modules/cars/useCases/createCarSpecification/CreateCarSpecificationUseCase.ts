import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  car_id: string;
  specifications: string[];
}

class CreateCarSpecificationUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute({ car_id, specifications }: IPayload): Promise<void> {
    const car = await this.carsRepository.findById(car_id);
    if (!car) {
      throw new AppError('Car was not found', 404);
    }

    return;
  }
}

export { CreateCarSpecificationUseCase };
