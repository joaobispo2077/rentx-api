import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/containers/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  rentalId: string;
  userId: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}
  async execute({ userId, rentalId }: IPayload): Promise<Rental> {
    const minimumDaily = 1;

    const rental = await this.rentalsRepository.findById(rentalId);

    if (!rental) {
      throw new AppError('Rental was not found', 404);
    }

    if (userId !== rental.user_id) {
      throw new AppError('User not allowed to devolution this rental', 401);
    }

    const currentDate = this.dateProvider.getDateNow();

    let rentalDaily = this.dateProvider.compareInDays(
      rental.start_date,
      currentDate,
    );

    if (rentalDaily < minimumDaily) {
      rentalDaily = minimumDaily;
    }

    const returnDelayInDays = this.dateProvider.compareInDays(
      currentDate,
      rental.expected_return_date,
    );

    const car = await this.carsRepository.findById(rental.car_id);
    if (!car) {
      throw new AppError('Car was not found', 404);
    }

    let total = 0;
    if (returnDelayInDays > 0) {
      const calculate_fine = returnDelayInDays * car.fine_amount;
      total = calculate_fine;
    }

    total += rentalDaily * car.daily_rate;
    rental.end_date = this.dateProvider.getDateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
