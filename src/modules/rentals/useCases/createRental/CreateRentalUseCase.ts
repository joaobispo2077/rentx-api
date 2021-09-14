import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/infra/typeorm/repositories/IRentalsRepository';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

dayjs.extend(utc);
class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IPayload): Promise<Rental> {
    const actualDate = dayjs().utc().local().format();
    const expectedReturnDateSerialized = dayjs(expected_return_date)
      .utc()
      .local()
      .format();

    const diffBetweenActualAndExpectedDate = dayjs(
      expectedReturnDateSerialized,
    ).diff(actualDate, 'hours');
    const minimumHour = 24;

    if (diffBetweenActualAndExpectedDate < minimumHour) {
      throw new AppError('Expected return date must be at least 24 hours', 422);
    }

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
