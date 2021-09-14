import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const newRental = this.repository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.repository.save(newRental);

    return newRental;
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne({
      car_id,
    });

    return rental;
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne({
      user_id,
    });

    return rental;
  }
}

export { RentalsRepository };
