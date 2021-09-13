import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';

import { Rental } from '../../entities/Rental';
import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();
    Object.assign(rental, {
      car_id: car_id,
      user_id: user_id,
      start_date: new Date(),
      expected_return_date: expected_return_date,
    });

    this.rentals.push(rental);
    return rental;
  }
  private rentals: Rental[] = [];

  async findOpenRentalByCarId(car_id: string): Promise<Rental | undefined> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date,
    );
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental | undefined> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date,
    );
  }

  clear(): void {
    this.rentals = [];
  }
}

export { RentalsRepositoryInMemory };
