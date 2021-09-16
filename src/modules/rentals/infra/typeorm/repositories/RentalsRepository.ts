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
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const newRental = this.repository.create({
      user_id,
      car_id,
      expected_return_date,
      id,
      end_date,
      total,
    });

    await this.repository.save(newRental);

    return newRental;
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne({
      where: { car_id, end_date: null },
    });

    return rental;
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne({
      where: { user_id, end_date: null },
    });

    return rental;
  }

  async findById(id: string): Promise<Rental | undefined> {
    const rental = this.repository.findOne(id);
    return rental;
  }

  findByUserId(user_id: string): Promise<Rental[]> {
    const rentals = this.repository.find({
      where: { user_id },
    });

    return rentals;
  }
}

export { RentalsRepository };
