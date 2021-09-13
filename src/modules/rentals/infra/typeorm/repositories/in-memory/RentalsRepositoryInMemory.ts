import { Rental } from '../../entities/Rental';
import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[] = [];

  async findOpenRentalByCarId(car_id: string): Promise<Rental | undefined> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && rental.end_date === null,
    );
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental | undefined> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && rental.end_date === null,
    );
  }

  clear(): void {
    this.rentals = [];
  }
}

export { RentalsRepositoryInMemory };
