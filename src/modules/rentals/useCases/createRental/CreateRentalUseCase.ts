import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/infra/typeorm/repositories/IRentalsRepository';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IPayload): Promise<Rental> {
    const isCarUnavailable = await this.rentalsRepository.findOpenRentalByCarId(
      car_id,
    );

    if (isCarUnavailable) {
      throw new AppError('Car is not available', 409);
    }

    const isUserUnavailable =
      await this.rentalsRepository.findOpenRentalByUserId(user_id);

    if (isUserUnavailable) {
      throw new AppError('User is not available', 409);
    }

    const newRental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    return newRental;
  }
}

export { CreateRentalUseCase };
